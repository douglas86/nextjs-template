"use client";

import useAppContext from "@/hooks/useAppContext";

const About = () => {
  const { user } = useAppContext();

  return (
    <div>
      {user && <h1>Welcome back {user.name} this is the about page</h1>}
    </div>
  );
};

export default About;
