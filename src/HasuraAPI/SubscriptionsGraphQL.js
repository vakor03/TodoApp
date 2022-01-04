import { gql } from '@apollo/client';

export const SubscribeTodo = gql`
    subscription NewTaskSubscription {
        todos(order_by: {id: asc}) {
            id
            title
            completed
        }
    }
`;