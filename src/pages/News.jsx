import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { styled } from "../common/stitches";
import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";

const News = () => {
  const data = [
    {
      date: "10 Now 2023",
      title: "The Best Answer",
      body: "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio and video content as it travels over a multiplicity of different types of interfaces. Such data interfaces as GVIF, DVI, and HDMI will all support the functionality of HDCP.",
    },
    {
      date: "10 Now 2023",
      title: "Heading - Latest Today",
      body: "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio and video content as it travels over a multiplicity of different types of interfaces. Such data interfaces as GVIF, DVI, and HDMI will all support the functionality of HDCP.",
    },
    {
      date: "",
      title: "This one came Before ‘Latest Today’",
      body: "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio and video content as it travels over a multiplicity of different types of interfaces. Such data interfaces as GVIF, DVI, and HDMI will all support the functionality of HDCP.",
    },
    {
      date: "01 Now 2023",
      title: "The Best Answer",
      body: "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio and video content as it travels over a multiplicity of different types of interfaces. Such data interfaces as GVIF, DVI, and HDMI will all support the functionality of HDCP.",
    },
  ];
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <List>
          {data.map((info, index) => (
            <ListItem key={index}>
              <Date>
                <DateText>{info.date}</DateText>
                <DateLine></DateLine>
              </Date>
              <Container style={{ padding: "0 30px" }}>
                <Heading>{info.title}</Heading>
                <Text>{info.body}</Text>
                <Button>read more</Button>
              </Container>
            </ListItem>
          ))}
        </List>
      </Container>
      <Container>
        <Footer />
      </Container>
    </Main>
  );
};

const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  "@bp640": {
    display: "block",
  },
});

const List = styled("ul", {
  color: "#757575",
  display: "flex",
  flexDirection: "column",
  gap: 40,
});

const ListItem = styled("li", {});

const Date = styled("div", {
  position: "relative",
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "space-between",
});

const DateText = styled("p", {
  fontSize: 13,
  wordBreak: "keep-all",
  minWidth: 90,
});

const DateLine = styled("span", {
  display: "block",
  width: "100%",
  height: 1.5,
  backgroundColor: "#e1e1e1",
});

const Heading = styled("h3", {
  textAlign: "center",
  fontWeight: 600,
  margin: "10px 0",
  color: "black",
});

const Text = styled("p", {
  fontSize: 14,
});

const Button = styled("button", {
  cursor: "pointer",
  textAlign: "center",
  fontWeight: 600,
  margin: "10px 0",
  color: "#1e1d1d",
  textTransform: "capitalize",
  "&:hover": {
    color: "#5d5757",
  },
});

export default News;
