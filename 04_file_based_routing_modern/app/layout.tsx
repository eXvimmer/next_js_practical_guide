import "@/app/ui/global.css";
import MainHeader from "@/components/layout/MainHeader";
import Wrapper from "@/components/layout/Wrapper";
import { NotificationContextProvider } from "@/store/notification-context";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        <NotificationContextProvider>
          <Wrapper>
            <main>{children}</main>
          </Wrapper>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
