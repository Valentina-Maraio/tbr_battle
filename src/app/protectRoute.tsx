import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute: NextPage<Props> = ({ children }) => {
    return children;
  };
  
  export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }
  
  export default ProtectedRoute;