import { Playfair_Display} from 'next/font/google';
import "./global CSS/global-css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjust weights as needed
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        {children}
      </body>
    </html>
  );
}
