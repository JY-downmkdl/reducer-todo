import React from "react";
function UserList({users, onRemove, onToggle}){
    return(
        <div>
            {users.map(user => (
                <div>
                    <span onClick={()=>onToggle(user.id)} style={{color: user.active ? 'red' : 'black'}}>
                        이름 : {user.username}
                        이메일 : {user.email}
                    </span>
                    <button onClick={()=>onRemove( user.id )}>삭제</button>
                </div>
            ))}
        </div>
    );
}
export default UserList;
