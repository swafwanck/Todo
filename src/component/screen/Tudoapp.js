import React,{ useState, useEffect } from 'react';
import styled from "styled-components";

export default function Tudoapp(){

  const [lists, setLists]=useState([
       {
         id:1,
         item:"bike",
       },
       {
        id:2,
        item:"car",
      },
      {
        id:3,
        item:"bus",
      }
  ]);
 

  const [listCompleted, setListCompleted] = useState([
    {
      id:4,
      item:"driver",
    },
    {
      id:5,
      item:"doctor",
    },
    {
      id:6,
      item:"business Man",
    }
  ]);

  const completeList=(id)=>{

    let list_current= lists.find((list)=>list.id===id);
    setListCompleted([...listCompleted,list_current]);

    let new_item = lists.filter((list)=>list.id !== id);
    setLists(new_item);

  }

  const revertList=(id)=>{

    let list_current= listCompleted.find((list)=>list.id === id);
    setLists([...lists,list_current]);

    let new_item = listCompleted.filter((list)=>list.id !== id);
    setListCompleted(new_item);

  }
 

  const renderLists =()=> {
     return lists.map ((list)=>(
            <ListItem>
                  <Left onClick={()=>completeList(list.id)}>
                    <Check></Check>
                     <Content>{list.id},{list.item}</Content>
                  </Left> 
                 <Right>
                     <Button onClick={()=>deleteList(list.id)}>

                           <ButtonImg src={require("./assets/delete.svg").default}  alt="delete" />

                    </Button>
                 </Right>
            </ListItem>
     
    )); 
  }
const [newList,setNewList]=useState("");

const [listCount,setListCount] = useState();

  const addList= (event)=>{
   
    event.preventDefault();
  setNewList("");

    let new_list ={
      id:listCount + 1,
      item:newList,
    };
    setLists([...lists, new_list]);
    
    setListCount((prev)=> prev + 1 )
  }
  useEffect(()=> {

    setListCount (parseInt([listCompleted.length + lists.length]));
   


},[]);


  const renderListsCompleted = () =>{
    return listCompleted.map((list)=>(
        <ListItem>
              <Left>
                  <CheckCom>
                        <TickImg src={require("./assets/tick-green.svg").default} />
                  </CheckCom>
                  <ContentCom>{list.id},{list.item}</ContentCom>
              </Left> 
              <Right>
                  <Button onClick={()=>revertList(list.id)}>
                       <ButtonImg src={require("./assets/revert.svg").default} alt="" /> 
                  </Button>
                  <Button onClick={()=>deleteListCompleted (list.id)} >
                       <ButtonImg src={require("./assets/delete.svg").default} alt="" />
                  </Button>
              </Right>
         </ListItem>
    ));
  }
 

 

  
   const deleteList=(s)=>{

     let new_item = lists.filter((list)=>list.id !== s);

     setLists(new_item);

   }
   const deleteListCompleted=(id)=>{

    let new_item = listCompleted.filter((list)=>list.id !== id);

    setListCompleted(new_item);

  }

  return(
        <Container>
            <Head>ToDo List</Head>
             <Todo>
                 <SubHead>Things to be Done</SubHead>
                 <List>{renderLists()}</List>
             </Todo>
             <TodoForm>
              <InputF value={newList} onChange={(e)=>setNewList(e.target.value)} placeholder="Type new Task" />
                  <SubmitButton onClick={(event)=>addList(event)}>Add New</SubmitButton>
             </TodoForm>
             <Todo>
                 <List>
                    {renderListsCompleted()}
                 </List>
             </Todo>
        </Container>
  )
}

const Container = styled.div`
width:90%auto;
max-width:1000px;
 min-height:100vh;
 padding:50px 10%;
 margin:0 auto;
 border-right:2px solid #f5f5f5;
 border-left:2px solid #f5f5f5;
`;
const Head = styled.h1
`
text-align: center;
font-size:52px;
font-weight:bold;
margin-bottom:40px;
`;
const Todo = styled.div
`
font-size: 32px;
margin-top: 24px;
margin-left:32px;
`;
const SubHead= styled.h4`
 font-size: 36px;
 color:#050241;

`;
const List = styled.ul``;
const ListItem = styled.li`
display: flex;
align-items:center;
margin-bottom:20px;
justify-content:space-between;
`;
const Left  = styled.div`
display:flex;
align-items:center;
`;
const Check = styled.span`
width:32px;
height:32px;
border-radius:50%;
border:2px solid #050241;
display:inline-block;
margin-right:15px;
cursor:pointer;
`;
const Content = styled.span`
  font-size:28px;
  cursor:pointer;
`;
const Right = styled.div``;
const Button = styled.button`
 border:none;
 background:none;
 cursor:pointer;
 margin-right:20px;
 outline:none;
 &:last-child{
   margin-right:0;
 }
`;

const ButtonImg = styled.img``;
const TodoForm = styled.form`
display:flex;
margin-left:40px;
margin-top:30px;
position:relative;
&::befor{
  content:"";
  background-image:url(${require("./assets/plus.svg").default});
  width:16px;
  height:16px;
  display:block;

  position:absolute;
  left:10px;
  top:0;
  bottom:0;
  margin:auto 0;
  z-index:2;
}
`;
const InputF = styled.input`
 width:100%;
 display:block;
 outline:none;
 border:1px solid #c6c6c6;
 border-right:none;
 padding:0 10px 0 35px;
 font-size:22px;
`;
const SubmitButton = styled.button`
    padding:15px 25px;
    white-space:nowrap;
    border:none;
    background:#050241;
    color:#fff;
    cursor:pointer;
    border-radius:6px;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
    font-size:24px;

`;
const CheckCom = styled.span
`
display:flex;
align-items:center;
justify-content:center;
border-color:#06c692;
width:32px;
height:32px;
border-radius:50%;
border:2px solid #06c692;
`;
const ContentCom = styled.span
`
color:#06c692;
`;
const TickImg = styled.img``;





