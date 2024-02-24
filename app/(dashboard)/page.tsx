"use client"

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";


interface DashboardPageProps {
  searchParams: {
    search?: string,
    favorites?: string,
  }
}


export default function DashboardPage({
  searchParams
}: DashboardPageProps) {

  const { organization } = useOrganization()

  return (
    <>
      <div className="flex flex-1 p-6 h-[calc(100%-90px)]">
        {
          !organization ? (
            <EmptyOrg />
          ) : (
            <BoardList 
              orgId= {organization.id}
              query={searchParams}
            />
          )
        }
      </div>
    </>
  );
}
