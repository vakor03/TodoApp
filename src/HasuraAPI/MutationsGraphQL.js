import {gql} from '@apollo/client';

export const UpdateTodo = gql`
    mutation ToggleTodo($id: Int!, $completed: Boolean!) {
        update_todos(where: {id: {_eq: $id}}, _set: {completed: $done}) {
            returning {
                id
                title
                completed
            }
        }
    }
`;

export const AddTodo = gql`
    mutation AddTodo($title: String!) {
        insert_todos(objects: {title: $text}) {
            returning {
                id
                title
                completed
            }
        }
    }
`;

export const RemoveTodo = gql`
    mutation DeleteTodo($id: Int!) {
        delete_todos(where: {id: {_eq: $id}}) {
            returning {
                id
                title
                completed
            }
        }
    }
`;