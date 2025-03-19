import UserProfileCard from '@/components/Biders/UserProfileCard';
import Header from "@/components/DashboardComp/Header";
import Sidebar from "@/components/DashboardComp/Sidebar";
import React, { useState } from "react";
import goodgirl1 from "@/assets/biders/goodgirl3.jpg";
import goodgirl2 from "@/assets/biders/goodgirl4.png";
const Biders: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  return (
    <div className="max-w-md mx-auto p-4">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <Header toggleSidebar={toggleSidebar} />

      <UserProfileCard 
        username="AHMAD95"
        rating={4.1}
        reviews={12}
        price={500}
        currency="ریال"
        deliveryDays={10}
        imageUrl={goodgirl2}
      />
      <UserProfileCard 
        username="AHMAD95"
        rating={4.1}
        reviews={12}
        price={500}
        currency="ریال"
        deliveryDays={10}
        imageUrl={goodgirl1}
      />
      <UserProfileCard 
        username="AHMAD95"
        rating={4.1}
        reviews={12}
        price={500}
        currency="ریال"
        deliveryDays={10}
        imageUrl={goodgirl2}
      />
      <UserProfileCard 
        username="AHMAD95"
        rating={4.1}
        reviews={12}
        price={500}
        currency="ریال"
        deliveryDays={10}
        imageUrl={goodgirl1}
      />
      <UserProfileCard 
        username="AHMAD95"
        rating={4.1}
        reviews={12}
        price={500}
        currency="ریال"
        deliveryDays={10}
        imageUrl={goodgirl1}
      />
    </div>
  );
}

export default Biders;