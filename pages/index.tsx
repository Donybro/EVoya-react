import Head from 'next/head'
import Image from 'next/image'
import DashboardLayout from "../app/layouts/Dashboard/DashboardLayout";
import StatisticsPage from "../app/components/Statistics/StatisticsPage";


export default function Home() {
  return (
      <DashboardLayout>
        <StatisticsPage/>
      </DashboardLayout>
  )
}
