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
          Politique de retour
        </h1>
        <p>
          Les actifs sont toutes les monnaies électroniques, les monnaies
          nationales fiduciaires non monétaires et monétaires, les
          crypto-monnaies et les jetons;
          <br />
          Le service d'échange (Service) est un logiciel situé sur Internet pour
          l'échange d'actifs;
          <br />
          L'échange est un transfert d'actifs entre les comptes du Service et de
          l'Utilisateur;
          <br />
          L'Utilisateur est toute personne qui a utilisé le Service et a envoyé
          les Actifs sur les comptes du Service intentionnellement pour
          effectuer l'Échange ou par erreur;
          <br />
          L'ordre est le désir du client d'échanger des actifs, exécuté
          électroniquement via les interfaces utilisateur sur les sites Web du
          service;
          <br />
          Le Timeout est le temps imparti à l'Utilisateur pour transférer les
          Actifs vers les comptes du Service afin d'effectuer l'Echange;
          <br />
          Les Fonds non comptabilisés sont les Actifs crédités sur les comptes
          de Service sans passer de Commande sur les sites Internet du Service
          ou les Actifs crédités sur les comptes de Service au-delà des montants
          spécifiés dans la Commande;
          <br />
          Le retour désigne les actions du Service pour transférer les actifs ou
          les fonds non comptabilisés des comptes de service vers les comptes
          d'utilisateurs;
          <br />
          Le remboursement désigne les actions du Service visant à annuler un
          échange terminé aux fins du retour.
        </p>
        <br />
        <p>
          1. Cette politique décrit les actions et inactions du Service pour la
          restitution des Actifs aux Utilisateurs, ainsi que les frais facturés
          par le Service pour le traitement des Retours. Cette politique fait
          partie intégrante des Conditions d'utilisation;
        </p>
        <br />
        <p>
          2. Le Retour ne peut être effectué que pour un montant n'excédant pas
          le montant de l'Actif envoyé par l'Utilisateur sur les comptes du
          Service d'Échange;
        </p>
        <br />
        <p>
          3. Le Retour ne peut être effectué que sur le compte de l'Utilisateur
          spécifié dans la Commande ou à partir duquel le Service a accepté les
          Actifs, sauf dans les cas énumérés à la clause #7.4 de la politique;
        </p>
        <br />
        <p>
          4. Les frais de service pour effectuer le retour sont déduits du
          montant de l'actif restitué à l'utilisateur;
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            5. Obligations du Service:
          </h3>
          5.1. Le Service s'engage à restituer les Actifs envoyés par
          l'Utilisateur sur les comptes du Service uniquement si l'Échange n'a
          pas été effectué. L'Utilisateur n'a pas reçu les Actifs du Service sur
          ses comptes;
          <br />
          5.2. Le Service s'engage à restituer les Fonds non comptabilisés à
          l'Utilisateur;
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            6. Le Service dispose des droits suivants:
          </h3>
          6.1. Ne pas restituer les actifs ou les fonds non comptabilisés avant
          que l'utilisateur ne demande le retour. Toute action du Service de
          restitution des Actifs conformément à la politique en vigueur n'est
          entreprise qu'après que l'Utilisateur a contacté le service
          d'assistance. Cela signifie que le Service n'agit pas en relation avec
          le Retour sans la demande de l'Utilisateur ;
          <br />
          6.2. Ne pas rembourser à l'Utilisateur les frais des systèmes de
          paiement en cas de Retour ;
          <br />
          6.3. Refuser l'Utilisateur dans la procédure de Remboursement, sauf
          dans les cas prévus à la clause #7.3 de la politique ;
          <br />
          6.4. Facturer des frais pour le retour des fonds non comptabilisés
          spécifiés à la clause 8.
          <br />
          6.5. Facturer des frais pour le retour spécifiés à la clause 8 si
          l'échange ne peut être effectué pour des raisons indépendantes de la
          volonté du service, en particulier lorsque le service n'est pas en
          mesure de terminer l'échange sur un compte bloqué ou limité de
          l'utilisateur ;
          <br />
          6.6. Facturez des frais pour le retour spécifiés dans la clause 8 pour
          les commandes annulées en raison du délai d'attente. L'Utilisateur a
          envoyé les Actifs sur les comptes du Service après l'annulation de la
          Commande et exige le Retour ;
          <br />
          6.7. Ne pas payer de commissions supplémentaires à l'Utilisateur
          conformément à la clause #7.2 de la présente politique ;
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            7. Conditions particulières:
          </h3>
          7.1. Le Service stocke gratuitement les Biens de l'Utilisateur à
          restituer ;
          <br />
          7.2. Le Service ne dispose pas des actifs de l'utilisateur à restituer
          à des fins commerciales et n'extrait aucun investissement ni aucun
          autre profit de ces actifs de quelque manière que ce soit ;
          <br />
          7.3. Le Service peut faire des concessions et effectuer le Retour en
          cas d'erreur de l'Utilisateur, à savoir lorsque l'Utilisateur a
          effectué l'Échange vers un compte inaccessible – par exemple, vers le
          compte de quelqu'un d'autre ; Pour effectuer le retour, l'utilisateur
          doit organiser de manière indépendante le retour de l'actif transféré
          par erreur sur le compte de service et négocier le retour avec le
          propriétaire du compte ou le système de paiement. Le Service commence
          à traiter le Retour de l'Utilisateur dans les conditions décrites dans
          la politique en vigueur et seulement après avoir reçu le montant total
          de l'Actif transféré à tort. Le Service facture des frais pour la
          restitution des actifs, spécifiés à la clause 8 de la police ;
          <br />
          7.4. Le Service peut faire des concessions et effectuer un Retour sur
          le compte de l'Utilisateur autre que celui spécifié dans la Commande,
          s'il est nécessaire de restituer l'Actif ou les tokens de
          cryptomonnaie.
        </p>
        <br />
        <p>
          <h3 style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>
            8. Frais:
          </h3>
          8.1. Le Service facture des frais conformément au tarif des Retours
          prévus par le contrat : 1,5-2%
        </p>
        <br />
        <h1 style={{ fontWeight: 600, marginBottom: 5, fontSize: 25 }}>
          À propos
        </h1>
        <p>
          AfiwaExchange est un service d'échange électronique qui se distingue
          par son fonctionnement automatisé, garantissant ainsi à ses clients
          des transactions instantanées vers des portefeuilles électroniques,
          Mobile Money ou des cartes bancaires. AfiwaExchange se positionne en
          tant que service d'échange multidevises polyvalent, en partenariat
          officiel avec divers systèmes de paiement internationaux. À l'heure
          actuelle, AfiwaExchange propose plus de 20 directions d'échange.
        </p>
        <br />
        <p>
          Nous accordons une importance particulière aux opérations de retrait
          de devises électroniques. AfiwaExchange est l'un des rares services
          d'échange à offrir des retraits instantanés vers des portefeuilles
          électroniques, Mobile Money ou des cartes bancaires. Ces transactions
          sont automatisées, et nos clients reçoivent presque immédiatement des
          notifications par SMS concernant la réception des fonds sur leur
          carte. Le traitement des paiements par carte est conforme à la norme
          de l'industrie PCI DSS.
        </p>
        <br />
        <p>
          Notre équipe de professionnels possède une vaste expérience dans le
          domaine des cryptomonnaies. AfiwaExchange traite un grand nombre de
          transactions en bitcoins, et à cette fin, nous développons et
          maintenons en permanence le bon fonctionnement de notre serveur
          Bitcoin, ce qui nous distingue de la plupart des services d'échange
          qui utilisent des API tierces. AfiwaExchange permet à nos clients de
          retirer des cryptomonnaies vers un portefeuille électronique, Mobile
          Money ou une carte bancaire en quelques secondes.
        </p>
        <br />
        <p>
          Pour répondre à la demande élevée de transactions d'échange, nous
          assurons un service continu 24 heures sur 24, 7 jours sur 7.
          AfiwaExchange s'appuie sur des ressources informatiques robustes et
          des fonctionnalités riches. En fonctionnant dans des services cloud,
          nous sommes en mesure de traiter des transactions en continu.
        </p>
        <br />
        <p>
          Nous mettons l'accent sur le coût des opérations d'échange, affirmant
          ainsi qu'AfiwaExchange propose certaines des meilleures conditions
          pour la plupart des transactions d'échange. Nous offrons les taux de
          change les plus compétitifs pour les transactions populaires. Ces
          économies sont possibles grâce à notre vaste expérience dans le
          domaine.
        </p>
        <br />
        <p>
          Nous garantissons des économies de coûts en automatisant nos processus
          commerciaux. Notre système de trading exclusif analyse les taux de
          change des concurrents et présente les meilleurs taux de change aux
          clients. Les petits services qui effectuent des échanges manuels n'ont
          aucune chance de rivaliser avec AfiwaExchange.
        </p>
        <br />
        <p>
          Même avec les meilleurs tarifs, nous offrons des avantages
          supplémentaires à nos clients réguliers grâce à notre programme de
          fidélité. L'inscription sur notre plateforme permet d'accéder à des
          remises cumulatives, ce qui permet aux clients de réaliser des
          échanges encore plus avantageux. Les remises peuvent aller jusqu'à 25
          % du bénéfice du service d'échange sur la transaction d'échange et
          sont appliquées lors de l'initiation d'une opération d'échange.
        </p>
        <br />
        <p>
          Fournir un support professionnel à nos clients est d'une importance
          capitale. AfiwaExchange dispose d'un solide système de support avec un
          système de ticket dédié pour chaque demande de client. Toute
          communication avec le client se déroule au sein du ticket,
          garantissant ainsi qu'aucune correspondance ne soit perdue ou
          interrompue avant que le client n'obtienne une assistance qualifiée.
          Notre équipe de spécialistes traite rapidement les demandes des
          clients au quotidien, résolvant les questions ou les problèmes en
          quelques minutes dans la plupart des cas.
        </p>
        <br />
        <p>
          La majorité de la correspondance avec les clients se déroule dans un
          environnement privé et sécurisé. L'ouverture et l'engagement
          d'AfiwaExchange envers la confiance des clients font de notre service
          un choix exceptionnel.
        </p>
        <br />
        <p>
          Nous attachons une grande importance à la confidentialité des données
          des clients. Les données personnelles saisies par les clients lors du
          processus de demande sont sécurisées grâce à des certificats SSL.
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
