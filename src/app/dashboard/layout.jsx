"use client";

function checkuserRole() {
  return "sender";
}

export default function Layout({ sender, deliveryservice }) {
  const role = checkuserRole();

  return <>{role === "deliveryservice" ? deliveryservice : sender}</>;
}
