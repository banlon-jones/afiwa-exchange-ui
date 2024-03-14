import React, { useState } from "react";
import ReactHtmlParser from "html-react-parser";
import { styled } from "../common/stitches";
import Container from "../components/container";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import "../style/faq.css";

const Faq = () => {
  const [faqs, setFaqs] = useState([
    {
      question:
        "Pièces transférées en deux transactions. À combien s'élèvera l'échange?",
      answer:
        "Dans le cas où les pièces ont été transférées en deux transactions, l'échange sera automatiquement ajusté au montant de la transaction qui recevra en premier la confirmation. L'échange sera complété pour ce montant, contrairement à ce que vous avez indiqué dans la demande. Veuillez noter que la deuxième transaction ne sera pas prise en compte par l'échangeur. Pour obtenir un remboursement de l'excédent, veuillez contacter le service d'assistance d'AfiwaExchange. Les remboursements seront effectués conformément à notre politique AfiwaExchange.",
      open: false,
    },
    {
      question:
        "Par erreur, j'ai transféré plus de pièces à l'échangeur que ce que j'avais indiqué dans la demande. Que dois-je faire?",
      answer:
        "Si vous avez transféré plus de pièces que ce que vous aviez indiqué dans la demande, l'échange sera traité automatiquement pour le montant spécifié dans la demande. Nous ne pouvons pas ajuster automatiquement et augmenter le montant de la demande pour verser plus de fonds que ce qui est indiqué, en raison de diverses restrictions et limites. Pour restituer la différence, veuillez contacter le service d'assistance AfiwaExchange. Les remboursements seront effectués conformément à notre politique AfiwaExchange.",
      open: false,
    },
    {
      question:
        "J'ai transféré moins de pièces que ce que j'avais indiqué lors du remplissage de la demande sur le site Web. Mon échange sera-t-il complété ?",
      answer:
        "Si le montant du paiement est inférieur au seuil minimum précisé sur le site, la demande ne sera pas traitée automatiquement. Pour résoudre le problème, vous devez contacter le service d'assistance AfiwaExchange. L'opérateur vous proposera des options pour résoudre le problème. Dans d'autres cas, lorsque le client a payé moins que ce qui est indiqué dans la demande, le montant sera ajusté, et l'échange sera complété automatiquement sans l'intervention de l'opérateur. Il n'est pas nécessaire de contacter le service d'assistance.",
      open: false,
    },
    {
      question:
        "Le temps de payer pour l'application est compté, et mon échange cryptographique retarde le transfert des pièces. Que dois-je faire?",
      answer:
        "Pas besoin de s'inquiéter ! L'adresse attribuée pour le paiement de la demande reste active dans notre système en permanence. Si les pièces arrivent à l'adresse de l'échangeur après l'annulation de la commande en raison d'un délai d'attente, l'échange ne sera pas terminé automatiquement. Vous devez attendre que la bourse ait fini de transférer les fonds, et la transaction dans la blockchain reçoive le nombre de confirmations requis par l'échangeur. Après cela, vous pouvez contacter le support AfiwaExchange. Les opérateurs vérifieront la réception des pièces à votre adresse et traiteront l'échange manuellement.",
      open: false,
    },
    {
      question:
        "Je ne peux pas vous payer en Litecoin car mon échange crypto ne prend pas en charge ce format d'adresse.",
      answer:
        "Depuis l'ajout du support SegWit à Litecoin en avril 2017, les adresses commençant par M ont été associées à des adresses commençant par 3. Nous générons des adresses au format P2WSH commençant par M, qui sont des adresses compatibles SegWit. Nous n'utilisons pas l'ancien format d'adresse P2SH. Actuellement, le problème ne devrait pas affecter le réseau Litecoin dans son ensemble, car tous les participants étaient tenus de mettre à jour leur logiciel. Si un échange cryptographique ou un portefeuille n'utilise pas l'ancien format d'adresse, cela devrait provoquer l'indignation des utilisateurs, car il y a eu largement le temps de changer. Cependant, si vous avez des problèmes pour transférer des fonds vers des adresses P2WSH commençant par M, vous pouvez utiliser des convertisseurs, comme AfiwaExchange. Il est important de noter que c'est un logiciel tiers, et l'échangeur n'est pas responsable de son fonctionnement.",
      open: false,
    },
    {
      question:
        "J'ai payé à l'échangeur Ripple, mais ma demande a été annulée. Que dois-je faire?",
      answer: `Cela peut se produire pour plusieurs raisons. Voici trois raisons courantes et les étapes à suivre :
        <ol>
          <br/><li>1. Le montant que vous avez payé à l'échangeur diffère du montant que vous avez indiqué lors du remplissage de la demande. L'échangeur s'attend à une correspondance à 100 % entre le montant spécifié dans la demande et le montant du transfert. Si ces montants diffèrent, le paiement n'est pas automatiquement reconnu par le système. Contactez le support de l'échangeur pour résoudre ce problème. Les opérateurs ajusteront le montant de la demande et termineront l'échange manuellement.</li>
          <br/><li>2. Le client n'a pas indiqué de "Tag" lors du paiement. Une étiquette de paiement est importante pour identifier automatiquement le paiement du client. Si le "Tag" n'est pas spécifié ou s'il est modifié, le système ne trouvera pas le paiement. Contactez le support de l'échangeur pour résoudre ce problème. Les opérateurs trouveront votre paiement et termineront l'échange manuellement.</li>
          <br/><li>3. Le paiement a été effectué après l'annulation de la demande en raison d'un délai d'attente. Cela se produit généralement lorsque vous effectuez un transfert vers l'adresse de l'échangeur à partir du compte d'une bourse de cryptomonnaies qui peut avoir des délais. Une fois la transaction enregistrée dans le navigateur de blocs, contactez le support de l'échangeur. Les opérateurs trouveront votre paiement et termineront l'échange manuellement.</li>
        </ol>`,
      open: false,
    },
    {
      question:
        "Par quel réseau dois-je transférer les pièces Tether ERC20 (USDT), Ethereum, XRP, BTC, TRC, LTC, etc. ?",
      answer: `Lors du choix du sens d'échange, faites attention à la valeur du réseau de cryptomonnaie affichée sur la vitrine. Si le réseau "Binance" n'est pas affiché dans la fenêtre de sélection du changement de cryptomonnaie, alors vous devez transférer les tokens dans le réseau standard de la devise sélectionnée.
        <br/>Si vous transférez d'autres tokens qui ne sont pas sur le réseau standard, nous ne les verrons pas, car l'adresse de paiement accepte uniquement les tokens sur un certain réseau. Vous devez donc vous assurer que vous utilisez le réseau correct pour transférer des fonds.`,
      open: false,
    },
    {
      question: "L'inscription est-elle obligatoire sur votre site ?",
      answer:
        "Non, l'inscription n'est pas obligatoire. Cependant, si vous vous inscrivez, vous pourrez suivre l'historique de vos échanges dans votre compte personnel.",
      open: false,
    },
    {
      question: "Avez-vous des réductions ou des offres spéciales ?",
      answer:
        "Toute condition particulière doit être négociée en privé. En général, elles sont offertes pour des montants d'échange importants. Pour convenir de ces conditions, créez un ticket dans notre système d'assistance AfiwaExchange en précisant le sens de l'échange et le montant.",
      open: false,
    },
    {
      question:
        "J'ai choisi une devise à échanger, mais maintenant je veux en obtenir une autre. Pouvez-vous faire un remplacement ?",
      answer:
        "Un tel changement n'est pas prévu par notre règlement de travail. Si vous ne pouvez pas recevoir de fonds de l'échangeur, vers le portefeuille spécifié dans l'application et dans la devise que vous avez choisie, il vous sera demandé d'effectuer un remboursement conformément à notre politique AfiwaExchange.",
      open: false,
    },
    {
      question: "L'échange des candidatures a commencé. Quel est le problème?",
      answer: `Parmi les principales raisons pour lesquelles cette situation peut se produire, les plus courantes sont :
      <br/>- Erreur dans les détails du destinataire ;
      <br/>- Dépassement de la limite du solde des fonds ;
      <br/>- Défaillance technique du service ;
      <br/>- Problèmes du côté des systèmes de paiement.
      <br/>Dans tous les cas, il est important de comprendre que les fonds reçus par l'échangeur ne peuvent pas simplement disparaître. Si vous rencontrez une telle situation, veuillez contacter le service support AfiwaExchange. Les opérateurs vous aideront à résoudre le problème.`,
      open: false,
    },
    {
      question: "L'échange a été suspendu. Pourquoi?",
      answer:
        "Le service AfiwaExchange a le droit de suspendre le fonctionnement et de retenir les fonds de l'utilisateur afin d'éviter des actions frauduleuses et d'autres activités qui pourraient entraîner des pertes financières et de réputation pour le service ou l'utilisateur. Si vous rencontrez une telle situation, veuillez contacter le service support AfiwaExchange. Les opérateurs vérifieront, identifieront la cause et suggéreront des moyens de résoudre le problème. Veuillez noter que certaines activités telles que la création d'un grand nombre de demandes d'échange pour attraper un taux préférentiel sans effectuer la majorité des échanges payants peuvent entraîner la suspension de vos échanges, conformément à nos conditions d'utilisation.",
      open: false,
    },
    {
      question:
        "Pourquoi le taux de change indiqué sur ma demande a-t-il été modifié ?",
      answer:
        "AfiwaExchange est un service d'échange automatique qui traite les échanges avec intervention manuelle. La politique de prix d'AfiwaExchange repose sur un algorithme automatique capable de modifier les taux de change à tout moment en fonction des conditions du marché. Le taux de conversion est généralement fixé lorsque l'utilisateur remplit le formulaire d'échange. Cependant, le taux peut changer avant que l'utilisateur procède au paiement. Le taux auquel l'échange est effectué est celui qui est affiché lorsque l'utilisateur clique sur 'Procéder au paiement'. Le service explique que le taux peut changer pour des raisons diverses et insiste sur l'importance de surveiller le taux tout au long du processus d'échange.",
      open: false,
    },
    {
      question: "Une fois mon paiement effectué, le taux de change a changé.",
      answer:
        "AfiwaExchange est un service d'échange entièrement automatique qui attend 20 minutes pour que les fonds arrivent à son adresse ou compte. Si les fonds n'arrivent pas dans ce délai, l'échange est annulé, et les fonds de l'échange sont retirés de la réserve. Pour résoudre ce problème, l'utilisateur doit contacter le support AfiwaExchange. Deux options sont généralement proposées : des remboursements conformément à la politique de remboursement d'AfiwaExchange ou la reprise et la finalisation de l'échange avec un éventuel changement du taux. Le taux actuel d'une devise sur AfiwaExchange peut différer des taux du marché sur d'autres plateformes d'échange de crypto-monnaie, car AfiwaExchange se base sur sa propre politique de prix. Si l'utilisateur n'est pas satisfait du nouveau taux de change, il peut refuser de poursuivre l'échange et opter pour le remboursement.",
      open: false,
    },
    {
      question:
        "Vous écrivez que l'échange s'est déroulé avec succès, mais je n'ai pas reçu de fonds sur ma carte bancaire ?",
      answer:
        "AfiwaExchange travaille avec des systèmes de paiement internationaux tels que Visa, MasterCard, MIR, Mobile Money pour transférer de l'argent vers des cartes bancaires. Généralement, les fonds sont crédités instantanément sur les cartes des clients. Cependant, le Ministère des Chemins de fer a des réglementations qui garantissent le crédit des fonds sur les cartes des clients dans un délai de 5 jours ouvrables. Bien que les retards soient rares, il peut arriver que les clients reçoivent des virements avec un léger retard, généralement dû à des problèmes temporaires au sein de la chaîne de paiement, impliquant des banques émettrices, des banques acquéreuses et des intégrateurs. Si un client n'a pas reçu de fonds sur sa carte dans les 5 jours ouvrables, il peut contacter le support AfiwaExchange pour lancer le processus de recherche de paiement. AfiwaExchange n'a pas connu de cas de perte de paiement, et si un paiement est manquant, le service rembourse les fonds au client.",
      open: false,
    },
    {
      question:
        "Est-il possible de retirer sur des cartes de banques non russes/africaines ?",
      answer:
        "AfiwaExchange effectue des échanges de cartes de banques de la Fédération de Russie et d'Afrique. Il n'est pas spécifié si les cartes de banques non russes ou non africaines sont prises en charge. Il serait recommandé de contacter le support AfiwaExchange pour obtenir des informations spécifiques sur les options de retrait disponibles.",
      open: false,
    },
    {
      question:
        "Est-il possible de restituer les pièces envoyées à l'adresse de l'escroc ?",
      answer:
        "Si le statut de la demande est complété, il est techniquement impossible d'annuler l'échange. Cependant, si l'échange n'est pas encore terminé, c'est-à-dire que l'échangeur n'a pas encore envoyé les fonds d'échange vers le portefeuille spécifié dans la demande, les fonds peuvent être restitués. Pour cela, l'utilisateur doit contacter le support AfiwaExchange.",
      open: false,
    },
    {
      question: "Attention ! Les sites frauduleux opèrent sous notre nom.",
      answer:
        "AfiwaExchange met en garde les utilisateurs contre les sites frauduleux qui copient leur interface et sont enregistrés sur des domaines similaires. Ces fraudeurs proposent généralement des offres non lucratives pour attirer des victimes. Les échanges sur ces sites frauduleux ne sont pas effectués, et personne ne répond aux demandes des victimes. AfiwaExchange conseille aux utilisateurs d'ajouter leur site officiel aux favoris de leur navigateur et de ne pas utiliser de sites douteux. Ils encouragent également les utilisateurs à signaler les sites de phishing afin de les neutraliser.",
      open: false,
    },
    {
      question:
        "Attention ! Les fraudeurs proposent du travail au nom de l'échangeur.",
      answer:
        "AfiwaExchange met en garde contre les fraudes liées à de prétendues offres d'emploi au nom de leur service d'échange, notamment pour des postes d'opérateurs du service client et autres spécialistes. Ces offres d'emploi frauduleuses demandent généralement aux victimes de payer pour leur formation. AfiwaExchange souligne que ces annonces d'embauche ne sont pas émises par eux et que toute demande de fonds de la part d'AfiwaExchange sur des ressources tierces est une action frauduleuse.",
      open: false,
    },
    {
      question: "Pourquoi n'acceptons-nous pas les 'pièces sales' ?",
      answer:
        "AfiwaExchange n'accepte pas les 'pièces sales' pour des raisons de conformité aux recommandations de l'organisation intergouvernementale GAFI (Groupe d'action financière internationale) visant à protéger le système financier international contre le blanchiment d'argent, le financement du terrorisme et le financement de la prolifération des armes de destruction massive. Ces recommandations sont reconnues comme la norme internationale en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme (LAB/CFT). AfiwaExchange vérifie les actifs transférés par les clients pour s'assurer qu'ils ne sont pas associés à des activités illégales et protéger ainsi ses utilisateurs. Ils n'acceptent pas les pièces qui ont été obtenues de manière frauduleuse, utilisées pour des activités illégales ou qui sont associées à des crimes tels que le trafic de drogue ou le financement du terrorisme. En acceptant ces pièces, les utilisateurs pourraient avoir des problèmes, et leur réputation pourrait en souffrir. AfiwaExchange prend la sécurité de ses utilisateurs très au sérieux et s'engage à lutter contre les activités illégales.",
      open: false,
    },
    {
      question:
        "Est-il possible de retirer sur des cartes de banques non russes/africaines ?",
      answer:
        "AfiwaExchange effectue des échanges de cartes de banques de la Fédération de Russie et d'Afrique. Il n'est pas spécifié si les cartes de banques non russes ou non africaines sont prises en charge. Il serait recommandé de contacter le support AfiwaExchange pour obtenir des informations spécifiques sur les options de retrait disponibles.",
      open: false,
    },
    {
      question:
        "Est-il possible de restituer les pièces envoyées à l'adresse de l'escroc ?",
      answer:
        "Si le statut de la demande est complété, il est techniquement impossible d'annuler l'échange. Cependant, si l'échange n'est pas encore terminé, c'est-à-dire que l'échangeur n'a pas encore envoyé les fonds d'échange vers le portefeuille spécifié dans la demande, les fonds peuvent être restitués. Pour cela, l'utilisateur doit contacter le support AfiwaExchange.",
      open: false,
    },
    {
      question: "Attention ! Les sites frauduleux opèrent sous notre nom.",
      answer:
        "AfiwaExchange met en garde les utilisateurs contre les sites frauduleux qui copient leur interface et sont enregistrés sur des domaines similaires. Ces fraudeurs proposent généralement des offres non lucratives pour attirer des victimes. Les échanges sur ces sites frauduleux ne sont pas effectués, et personne ne répond aux demandes des victimes. AfiwaExchange conseille aux utilisateurs d'ajouter leur site officiel aux favoris de leur navigateur et de ne pas utiliser de sites douteux. Ils encouragent également les utilisateurs à signaler les sites de phishing afin de les neutraliser.",
      open: false,
    },
    {
      question:
        "Attention ! Les fraudeurs proposent du travail au nom de l'échangeur.",
      answer:
        "AfiwaExchange met en garde contre les fraudes liées à de prétendues offres d'emploi au nom de leur service d'échange, notamment pour des postes d'opérateurs du service client et autres spécialistes. Ces offres d'emploi frauduleuses demandent généralement aux victimes de payer pour leur formation. AfiwaExchange souligne que ces annonces d'embauche ne sont pas émises par eux et que toute demande de fonds de la part d'AfiwaExchange sur des ressources tierces est une action frauduleuse.",
      open: false,
    },
    {
      question: "Pourquoi n'acceptons-nous pas les 'pièces sales' ?",
      answer:
        "AfiwaExchange n'accepte pas les 'pièces sales' pour des raisons de conformité aux recommandations de l'organisation intergouvernementale GAFI (Groupe d'action financière internationale) visant à protéger le système financier international contre le blanchiment d'argent, le financement du terrorisme et le financement de la prolifération des armes de destruction massive. Ces recommandations sont reconnues comme la norme internationale en matière de lutte contre le blanchiment de capitaux et le financement du terrorisme (LAB/CFT). AfiwaExchange vérifie les actifs transférés par les clients pour s'assurer qu'ils ne sont pas associés à des activités illégales et protéger ainsi ses utilisateurs. Ils n'acceptent pas les pièces qui ont été obtenues de manière frauduleuse, utilisées pour des activités illégales ou qui sont associées à des crimes tels que le trafic de drogue ou le financement du terrorisme. En acceptant ces pièces, les utilisateurs pourraient avoir des problèmes, et leur réputation pourrait en souffrir. AfiwaExchange prend la sécurité de ses utilisateurs très au sérieux et s'engage à lutter contre les activités illégales.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container width="dynamic" add="headerMargin" style={{ flex: 1 }}>
        <List className="faqs">
          {faqs.map((faq, index) => (
            <ListItem
              key={index}
              className={"faq " + (faq.open ? "open" : "")}
              onClick={() => toggleFAQ(index)}
            >
              <Heading className="faq-question">{faq.question}</Heading>
              <Text className="faq-answer">{ReactHtmlParser(faq.answer)}</Text>
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
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const ListItem = styled("li", {});

const Heading = styled("h3", {
  padding: 10,
  cursor: "pointer",
  borderBottom: "1px solid #b5b5b578",
  borderLeft: "5px solid transparent",
  fontSize: 16,
  "&:hover": {
    borderLeftColor: "green",
  },
});

const Text = styled("p", {
  color: "#2f2f2fc2",
  padding: "0 10px 10px",
  fontSize: 15,
});

export default Faq;
