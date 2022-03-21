import JSONSample from "./json-sample.json"


const myFormExperience = createFireboltEngine({
  resolvers: {
    getJSONSchema: JSONSample,
    getSession: (sessionId: string) => {
      // asdf
    },
    setSession: (sessionId: string) => {

    }
  },
  hooks: {
    
  }
})

// ----------------------------------

// uso com express
import expressFireboltAdapter from "asdfdsad"
const expressFirebolt = expressFireboltAdapter(myFormExperience)

app.use("/form", expressFirebolt)


// uso com serverless

// uso com browser
