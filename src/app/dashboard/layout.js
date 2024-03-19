"use client";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";

export default function Layout({ sender, deliveryService }) {
  const { data: session } = useSession();
  const role = session?.user.role;

  return <>{role === "deliveryService" ? deliveryService : sender}</>;
}

Layout.propTypes = {
  sender: PropTypes.node.isRequired,
  deliveryService: PropTypes.node.isRequired,
};
