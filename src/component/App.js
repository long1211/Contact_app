import React, {
  useState,
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  uuid
} from "uuidv4";
import api from "../api/contacts"
import "./App.css";
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetail from "./ContactDetail"
import EditContact from "./EditContact"

const App = () => {

    const Local_storage_key = "contacts";
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([])

    //RetrieveContacts
    const retriveContact = async () => {
      const response = await api.get("/contacts");
      return response.data;
    }

    const addContactHandler = async (contact) => {
      console.log(contact);
      const request = {
        id: uuid(),
        ...contact
      }
      const res = await api.post("/contacts", request)
      console.log(res)
      setContacts([...contacts, res.data]);
    };

    const EditContactDetail = async (contact) => {
      const res = await api.put(`/contacts/${contact.id}`, contact)
      const {
        id,
        name,
        email
      } = res.data
      setContacts(
        contacts.map((contact) => {

          return contact.id === id ? {
            ...res.data
          } : contact;
        })

      );

    }

    const removeContactHandler = async (id) => {
      await api.delete(`/contacts/${id}`)
      const newContactList = contacts.filter((contact) => {

        return contact.id !== id;
      });
      setContacts(newContactList)
    }

   const searchHandler = (searchTerm) => {
          setSearchTerm(searchTerm);
          if(searchTerm !== ""){
            const newContactList = contacts.filter((contact) => {
              return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
            })
            setSearchResults(newContactList)
          }else{
            setSearchResults(contacts)
          }
   }

    useEffect(() => {

      const getAllContact = async () => {
        const allContact = await retriveContact()
        if (allContact) setContacts(allContact)
      }
      getAllContact();

    }, [])

    useEffect(() => {
      // localStorage.setItem(Local_storage_key, JSON.stringify(contacts));
    }, [contacts])

    return ( 
      <div className="ui container">
        <Router >
        <Header />

        <Switch >

        <Route path = "/"
        exact render = {
          (props) => ( < ContactList 
            {...props}
            contacts = {searchTerm.length < 1 ? contacts : searchResults}
            getContactId = {
              removeContactHandler
            }
            term={searchTerm}
            searchKeyword={searchHandler}
            />)}  />

            < Route path = "/add"
            render = {
              (props) => ( <
                AddContact {
                  ...props
                }
                addContactHandler = {
                  addContactHandler
                }
                />
              )
            }
            />

            <
            Route path = "/edit"
            render = {
              (props) => ( <
                EditContact {
                  ...props
                }
                EditContactDetail = {
                  EditContactDetail
                }
                />
              )
            }
            /> <Route path = "/contact/:id"
            component = {
              ContactDetail
            }/>

            </Switch>

            </Router>

            </div>
          )
        }

        export default App;