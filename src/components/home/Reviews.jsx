import React from "react";
import { styled } from "../../common/stitches";

const reviews = () => {
  const data = [
    {
      biolograph:
        "The service was great. The speed was really awesome and all my questions were answered. Will be coming back! Thank you so much.",
    },
    
    {
      biolograph:
        "AfiwaExchange has really automated some of our company’s processes. We now spend less time doing manual transactions. It’s making money transfer and payments very easy for us. Thanks to its speed, we don’t need partners to worry about getting payments with delays.",
    },
    {
      biolograph:
        "If you’re in search of a reliable, innovative software for payments and money transfer, look no further than AfiwaExchange. Their team of seasoned professionals consistently exceeds expectations, offering cutting-edge solutions and exceptional customer service. They took the time to understand my specific needs and provided a tailor-made solution that greatly improved our operations. I am thrilled with the results and highly recommend AfiwaExchange for any payment and money transfer needs.",
    },
  ];

  return (
    <ReviewWrapper id="reviews">
      {data.map((user, index) => (
        <ProfileContainer key={index}>
          <Profile>
            {user.image_url && <Img src={user.image_url}></Img>}
            {user.full_name && <h3 style={{ fontWeight: "bold" }}>{user.full_name}</h3>}
          </Profile>
          <P>{user.biolograph}</P>
          {/* <P type="showMore">1h ago</P> */}
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
