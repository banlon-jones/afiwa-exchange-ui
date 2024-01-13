import React from "react";
import { styled } from "../../common/stitches";

const reviews = () => {
  const data = [
    {
      image_url:
        "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
      full_name: "James Ron",
      biolograph:
        "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio. Add more text here for an ddditonal something",
    },
    {
      image_url:
        "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
      full_name: "James Ron",
      biolograph:
        "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio. Add more text here for an ddditonal something",
    },
    {
      image_url:
        "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
      full_name: "James Ron",
      biolograph:
        "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio. Add more text here for an ddditonal something",
    },
    {
      image_url:
        "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop",
      full_name: "James Ron",
      biolograph:
        "Developed by the Intel Corporation, HDCP stands for high-bandwidth digital content protection. As the descriptive name implies, HDCP is all about protecting the integrity of various audio. Add more text here for an ddditonal something",
    },
  ];

  return (
    <ReviewWrapper id="reviews">
      {data.map((user, index) => (
        <ProfileContainer key={index}>
          <Profile>
            <Img src={user.image_url}></Img>
            <h3 style={{ fontWeight: "bold" }}>{user.full_name}</h3>
          </Profile>
          <P>{user.biolograph}</P>
          <P type="showMore">1h ago</P>
        </ProfileContainer>
      ))}
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  padding: "15px 0 0",
  "@bp640": {
    gridTemplateColumns: "1fr",
  },
});

const ProfileContainer = styled("div", {});

const Profile = styled("div", {
  display: "flex",
  gap: 10,
  alignItems: "center",
});

const Img = styled("img", {
  width: 30,
  height: 30,
  borderRadius: "50%",
  overflow: "hidden",
  objectFit: "contain",
});

const P = styled("p", {
  color: "#757575",
  marginTop: 14,
  fontSize: 15,

  variants: {
    type: {
      showMore: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },
  },
});

export default reviews;
