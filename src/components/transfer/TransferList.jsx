"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getAllTransfers } from "../../services";
import { SidebarAdmin } from '../Navbar/SidebarAdmin';
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export const TransferList = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      const { transferencesUser } = await getTransferences();
      setTransfers(transferencesUser);
    };
    fetchTransfers();
  }, []);

  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <h2>Mis transferencias</h2>
      <ul>
        {transfers.map((t) => (
          <li key={t._id}>
            A: {t.addresserName} | Monto: ${t.amount} | Fecha: {new Date(t.date).toLocaleString()} | Motivo: {t.motive}
          </li>
        ))}
      </ul>
    </div>
  );
};