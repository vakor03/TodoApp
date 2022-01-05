// async function fetchGraphQL(operationsDoc, operationName, variables) {
//     const result = await fetch(
//         `https://todo-vakor-api.hasura.app/v1/graphql`,
//         {
//             headers: {
//                 "content-type": "application/json",
//                 "x-hasura-admin-secret": "WagKYQUh0NIv5z5XXgQ9JNRiu2YZVOr1kpWdCMRvqGYAJc192UxH5rpwXGJAlcMV"
//             },
//             method: "POST",
//             body: JSON.stringify({
//                 query: operationsDoc,
//                 variables: variables,
//                 operationName: operationName
//             })
//         },
//     );
//
//     return await result.json();
// }
//
// const operationsDoc = `
//   query Get{
//     todos {
//       id
//       task
//       completed
//     }
//   }
//
//   mutation RemoveTodo($id: Int!) {
//   delete_todos_by_pk(id: $id){
//     id
//   }
// }
//
//     mutation UpdateTodo($id: Int!, $task: String!) {
//         update_todos_by_pk(pk_columns: {id: $id}, _set: {task:$task}) {
//             task
//     }
// }
// mutation AddTodo($todo: todos_insert_input!) {
//   insert_todos(objects: [$todo]) {
//     affected_rows
//   }
// }
// mutation CompleteTodo($id: Int!, $completed: Boolean!) {
//         update_todos_by_pk(pk_columns: {id: $id}, _set: {completed:$completed}) {
//             completed
//     }
// }
// `;
//
// function fetchGet(operationName) {
//     return fetchGraphQL(
//         operationsDoc,
//         operationName,
//         {}
//     );
// }
//
// function fetchAddTodo(operationName, props) {
//     return fetchGraphQL(
//         operationsDoc,
//         operationName,
//         {
//             "todo": {
//                 "task": props.task,
//                 "completed": "false"
//             }
//         }
//     );
// }
//
// function fetchDeleteTodo(operationName, props) {
//     return fetchGraphQL(
//         operationsDoc,
//         operationName,
//         {
//             "id": props,
//         }
//     );
// }
//
// function fetchUpdateTodo(operationName, props) {
//     return fetchGraphQL(
//         operationsDoc,
//         operationName,
//         {
//             "id": props.id,
//             "task": props.task
//         }
//     );
// }
//
// function fetchUpdateCompleted(operationName, props) {
//     return fetchGraphQL(
//         operationsDoc,
//         operationName,
//         {
//             "id": props.id,
//             "completed": props.completed
//         }
//     );
// }
//
// export const startFetchMyQuery = async (operationName, props) => {
//     let errors = [];
//     let data = "";
//     switch (operationName) {
//         case "Get":
//             ({errors, data} = await fetchGet(operationName));
//             break;
//         case "AddTodo":
//             ({errors, data} = await fetchAddTodo(operationName, props));
//             break;
//         case "CompleteTodo":
//             ({errors, data} = await fetchUpdateCompleted(operationName, props));
//             break;
//         case "RemoveTodo":
//             ({errors, data} = await fetchDeleteTodo(operationName, props));
//             break;
//         case "UpdateTodo":
//             ({errors, data} = await fetchUpdateTodo(operationName, props));
//             break;
//     }
//
//
//     if (errors) {
//         // handle those errors like a pro
//         console.error(errors);
//     }
//     return data;
//     // this.setState({todos: data.todos})
//     // do something great with this precious data
//
// }
//
