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
					DEFAULT: 'hsl(var(--primary)/ <alpha-value>)',
					light: 'hsl(var(--primary-light)/ <alpha-value>)',
					dark: 'hsl(var(--primary-dark)/ <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground)/ <alpha-value>)',
					foreground80: 'hsl(var(--primary-foreground-80)/ <alpha-value>)',
					foreground60: 'hsl(var(--primary-foreground-60)/ <alpha-value>)',
					foreground50: 'hsl(var(--primary-foreground-50)/ <alpha-value>)',
					foreground30: 'hsl(var(--primary-foreground-30)/ <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary)/ <alpha-value>)',
					light: 'hsl(var(--secondary-light)/ <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground)/ <alpha-value>)',
					purple: 'hsl(var(--secondary-purple)/ <alpha-value>)',
					purpleLight: 'hsl(var(--secondary-purple-light)/ <alpha-value>)',
					foregroundPurple: 'hsl(var(--secondary-foreground-purple)/ <alpha-value>)',
					green: 'hsl(var(--secondary-green)/ <alpha-value>)',
					greenLight: 'hsl(var(--secondary-green-light)/ <alpha-value>)',
					foregroundGreen: 'hsl(var(--secondary-foreground-green)/ <alpha-value>)',
					red: 'hsl(var(--secondary-red)/ <alpha-value>)',
					redLight: 'hsl(var(--secondary-red-light)/ <alpha-value>)',
					foregroundRed: 'hsl(var(--secondary-foreground-red)/ <alpha-value>)',
					yellow: 'hsl(var(--secondary-yellow)/ <alpha-value>)',
					yellowLight: 'hsl(var(--secondary-yellow-light)/ <alpha-value>)',
					foregroundYellow: 'hsl(var(--secondary-foreground-yellow)/ <alpha-value>)',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted)/ <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground)/ <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent)/ <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground)/ <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive)/ <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground)/ <alpha-value>)'
				},
				border: 'hsl(var(--border)/ <alpha-value>)',
				input: 'hsl(var(--input)/ <alpha-value>)',
				ring: 'hsl(var(--ring)/ <alpha-value>)',
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
