import { useReducer, useRef } from 'react';
import './App.css';
import UserList from './components/UserLists';
import CreateUser from './components/CreateUser';
import { type } from '@testing-library/user-event/dist/type';

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id:1, username: 'green', email:'green@naver.com',
      active: false
    },
    {
      id:2, username: 'blue', email:'blue@naver.com',
      active: false
    },
    {
      id:3, username: 'yellow', email:'yellow@naver.com',
      active: false
    }
  ]
}
//reducer 함수 만들기!
function reducer(state, action){
  switch(action.type){
    case 'INPUTCHANGE':
      return{
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      }
    // createuser
    case 'CREATEUSER':
      return{
        // 인풋 값 ㅇ초기화
        inputs:{
          username: "",
          email: ""
        },
        users: [
          ...state.users,
          action.user
        ]
      }
    case 'USERREMOVE':
      //user의 id 와 액선 객체가 가지고 있는 id dㅘ 비교해서
      // 다를때만 user를 리턴
      return{
        ...state,
        users: state.users.filter( user => user.id !== action.id)
      }
    case 'USERTOGGLE':
      // active 반전시키기
      return{
        ...state,
        users: state.users.map( user => user.id === action.id? 
          {...user, active: !user.active} : user)
      }
    default:
      return state;
  }
}
function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state;

  // 1. 인풋 값 바뀌면 inputs 값 변경하기
  const{username, email} = state.inputs;
  const onChange=(e)=>{
    const {name, value} = e.target;
    dispatch({
      //보통 대문자로 쓴다
      type: "INPUTCHANGE",
      name: name,
      value: value
    })
  }

  //2. 등록버튼 클릭 시 users 배열에 항목 추가하기
  //id 번호
  const nextId= useRef(4);
  const onCreate = () =>{
    //reduce 호출 (액션객체전달)
    dispatch({
      type: "CREATEUSER",
      user:{
        id: nextId.current,
        username: username,
        email: email,
        active: false
      }
    })
    // nextId 값 1씩 더해주기 씨발
    nextId.current += 1;
  }

  //3. 삭제버튼 클릭시 user 배열에서 해당 user 제거
  const onRemove = (id) =>{
    dispatch({
      type: 'USERREMOVE',
      id: id
    })
  }

  //4. user 항목 클릭시 active 반전( true라면 false로 )
  const onToggle = (id) => {
    dispatch({
    type: 'USERTOGGLE',
    id: id
    })
  }


  return (
    <div className="App">
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <CreateUser  username={username} email={email}
      onChange={onChange} onCreate={onCreate}/>
    </div>
  );

}

export default App;
