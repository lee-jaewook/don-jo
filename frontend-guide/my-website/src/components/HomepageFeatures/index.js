import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Decentralized Fundraising",
    Svg: require("@site/static/img/undraw_ether.svg").default,
    description: (
      <>
        Our platform enables decentralized fundraising for developers,
        eliminating the need for intermediaries. Direct donations from
        supporters to developers empower both parties and foster trust.
      </>
    ),
  },
  {
    title: "Easy Integration",
    Svg: require("@site/static/img/undraw_button.svg").default,
    description: (
      <>
        Our donation button is designed for easy integration into any website or
        application. It allows developers to receive support with minimal setup
        and maintenance efforts.
      </>
    ),
  },
  {
    title: "Transparent Transactions",
    Svg: require("@site/static/img/undraw_transaction.svg").default,
    description: (
      <>
        By leveraging the Ethereum blockchain, we ensure that all transactions
        are transparent and publicly verifiable. This openness increases
        accountability and fosters donor confidence.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
