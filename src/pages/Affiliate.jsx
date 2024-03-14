import React from "react";
import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { styled } from "../common/stitches";

const PrivacyPolicy = () => {
  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <h1 style={{ fontWeight: 600, marginBottom: 5, fontSize: 25 }}>
          PROGRAMME D'AFFILIATION
        </h1>
        <p>
          Tout utilisateur enregistré sur AfiwaExchange a la possibilité de
          participer à notre programme d'affiliation. Grâce à ce programme, vous
          avez la possibilité de générer des revenus, pouvant aller jusqu'à 5%
          de l'ensemble des transactions réalisées par le biais de votre lien
          affilié. Vous avez la flexibilité totale de retirer vos gains à tout
          moment, selon votre convenance. Les bénéfices seront traités et versés
          dans un délai allant de 1 à 5 jours ouvrables.
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            Fonctionnement du Programme:
          </h3>
          Lorsqu'un nouvel utilisateur accède à notre plateforme via votre lien
          affilié, notre système enregistre automatiquement votre numéro
          d'identification. Si cet utilisateur effectue avec succès une
          transaction sur notre plateforme, vous recevrez 2% du montant de la
          différence entre les deux devises échangées. Par exemple, si un
          utilisateur décide d'échanger 100 dollars avec un taux de change de 1
          = 0,95, l'utilisateur recevra 95 dollars, et vous obtiendrez 5% de la
          différence, soit 5% de 5.
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            Comment utiliser le Programme d'Affiliation:
          </h3>
          - Connectez-vous à votre compte.
          <br />- Rendez-vous dans l'onglet "Affiliation."
          <br />- Copiez le lien d'affiliation généré et partagez-le avec vos
          amis, sur les réseaux sociaux, ou tout autre endroit pertinent.
          Attendez-vous à générer des revenus grâce à ce partage.
        </p>
        <br />
        <p>
          N'hésitez pas à nous contacter si vous avez des questions ou besoin
          d'informations supplémentaires. Nous sommes à votre disposition pour
          vous assister.
        </p>
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

export default PrivacyPolicy;
