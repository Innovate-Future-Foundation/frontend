#!/bin/bash

# Update package index and upgrade packages
apt-get update
apt-get upgrade -y

# Install necessary packages
apt-get install -y openjdk-11-jdk

# Format and mount EBS volume for Jenkins data
if [ -b /dev/nvme1n1 ] && ! mountpoint -q /data/jenkins; then
    mkfs -t ext4 /dev/nvme1n1
    mkdir -p /data/jenkins
    mount /dev/nvme1n1 /data/jenkins
    echo "/dev/nvme1n1 /data/jenkins ext4 defaults,nofail 0 2" >> /etc/fstab
fi

# Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
    /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
    https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
    /etc/apt/sources.list.d/jenkins.list > /dev/null

apt-get update
apt-get install -y jenkins

# Configure Jenkins home directory
mkdir -p /data/jenkins
chown -R jenkins:jenkins /data/jenkins
sed -i 's/JENKINS_HOME=.*/JENKINS_HOME=\/data\/jenkins/' /etc/default/jenkins

# Install Docker
apt-get install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start services
systemctl enable jenkins
systemctl start jenkins
systemctl enable docker
systemctl start docker

# Add jenkins user to docker group
usermod -aG docker jenkins

# Install Git
apt-get install -y git

# Wait for Jenkins to start
sleep 30