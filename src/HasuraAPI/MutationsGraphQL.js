import { gql } from '@apollo/client';

export const CompleteTodoMutation = gql`
    mutation CompleteTodo($id: Int!, $completed: Boolean!) {
        update_todos(
            where: { id: { _eq: $id } }
            _set: { completed: $completed }
        ) {
            returning {
                id
                title
                completed
            }
        }
    }
`;

export const UpdateTodoMutation = gql`
    mutation CompleteTodo($id: Int!, $title: String!) {
        update_todos(where: { id: { _eq: $id } }, _set: { title: $title }) {
            returning {
                id
                title
                completed
            }
        }
    }
`;

export const AddTodoMutation = gql`
    mutation AddTodo($title: String!) {
        insert_todos(objects: { title: $title }) {
            returning {
                id
                title
                completed
            }
        }
    }
`;

export const RemoveTodoMutation = gql`
    mutation RemoveTodo($id: Int!) {
        delete_todos(where: { id: { _eq: $id } }) {
            returning {
                id
                title
                completed
            }
        }
    }
`;
