import { gql } from "@apollo/client"
export const GET_STATISTICS = gql`
    query statistic {
        orderStatistics {
            totalSales
            servedClients
            foodSold
        weeklySales {
            day,
            total
        }
        bestSellingFood {
            totalSold
            name
            image
        }
    }
}

`