/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	important: true,
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: '640px', // @media (min-width: 640px) { ... }
			md: '768px', // @media (min-width: 768px) { ... }
			lg: '1024px', // @media (min-width: 1024px) { ... }
			xl: '1280px', // @media (min-width: 1280px) { ... }
			'2xl': '1536px', // @media (min-width: 1536px) { ... }
		},
		extend: {
			boxShadow: {},
			spacing: {},
			borderWidth: {},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background)/ <alpha-value>)',
				foreground: 'hsl(var(--foreground)/ <alpha-value>)',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))',
					foreground: 'hsl(var(--primary-foreground))',
					foreground80: 'hsl(var(--primary-foreground-80))',
					foreground60: 'hsl(var(--primary-foreground-60))',
					foreground50: 'hsl(var(--primary-foreground-50))',
					foreground30: 'hsl(var(--primary-foreground-30))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					light: 'hsl(var(--secondary-light))',
					foreground: 'hsl(var(--secondary-foreground))',
					purple: 'hsl(var(--secondary-purple))',
					purpleLight: 'hsl(var(--secondary-purple-light))',
					foregroundPurple: 'hsl(var(--secondary-foreground-purple))',
					green: 'hsl(var(--secondary-green))',
					greenLight: 'hsl(var(--secondary-green-light))',
					foregroundGreen: 'hsl(var(--secondary-foreground-green))',
					red: 'hsl(var(--secondary-red))',
					redLight: 'hsl(var(--secondary-red-light))',
					foregroundRed: 'hsl(var(--secondary-foreground-red))',
					yellow: 'hsl(var(--secondary-yellow))',
					yellowLight: 'hsl(var(--secondary-yellow-light))',
					foregroundYellow: 'hsl(var(--secondary-foreground-yellow))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			animation: {
				'scale-up': 'scaleUp 0.5s ease-out forwards',
				'check': 'check 0.5s ease-out forwards 0.3s',
				'float-1': 'float 3s ease-in-out infinite',
				'float-2': 'float 3s ease-in-out infinite 0.5s',
				'float-3': 'float 3s ease-in-out infinite 1s',
				'float-4': 'float 3s ease-in-out infinite 1.5s',
			},
			keyframes: {
				scaleUp: {
					'0%': { transform: 'scale(0)', opacity: 0 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
				check: {
					'0%': { strokeDasharray: '0,100' },
					'100%': { strokeDasharray: '100,100' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
