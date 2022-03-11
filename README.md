# Firebolt
![alt text](https://iq-tech.github.io/firebolt-docs/logo.png)

Full docs at: [docs site](https://iq-tech.github.io/firebolt-docs/en/introduction/)

## What is Firebolt?

Firebolt is a toolkit built to accelerate the process of the creation and maintaining of multistep forms flow. It's a fullstack tool (javascript/typescript) with code sharing to support this scenario.

Configurated oriented, using just one Schema JSON file we can define a full form experience. The JSON file is interpreted both by the back-end and by the front-end. 

The Firebolt idea isn't to be a form generator due to following this could be difficult the routinely form customizations on those kinds of forms but be an organizer/orchestrator of all the processes to create and manage the form.

## Why to use Firebolt?

* Avoid rewrite of similar forms and code;
* Falicitate the existent forms modification such as: change the field position and the order os the steps;
* Define a form default that can be used both by the back-end and by the front-end, facilitating the creation and the maintenance of the forms;
* Allow the versioning of the forms;
* Decrease the friction between the back-end and front-end related to the endpoints, due to the data formatting sent and the endpoints used is automated by the Firebolt;
* The developer can customize the components of each form (thematization) and also create presets for config some input fields.

## Firebolt x Other technologies

|                                                                             | Firebolt | React JSON Schema Form |
| --------------------------------------------------------------------------- | -------- | ---------------------- |
|                                                                             |          |                        |
| Render a form from a JSON file                                              | ✅        | ✅                      |
| Integrate the back-end and the front-end                                    | ✅        | ❌                      |
| Handle with the data formatting sent to the back-end and with the endpoints | ✅        | ❌                      |
| Minimalist JSON Schema                                                      | ✅        | ❌                      |
| Support multistep forms with back-end and front-end comunication            | ✅        | ❌                      |
| Support for different themes                                                | ✅        | ✅                      |

The use of Firebolt is more indicated to situations that you need to create a infrastructure of multistep forms, between back-end and front-end (data base, endpoints and etc)

## Architecture

The project is mainly composed of two parts, the API and the Client.

The Firebolt Client is a front-end library that can be used on any React application, it provides a series of components that helps with common front-end tasks when building forms such as steps progression, HTTP requests, user sessions, and so on. It can automatically connect with the Firebolt API, with this the developer does not have to worry about endpoints, request bodies, and so on.

Both the API and the Client use a common library to perform validations, the Firebolt Validators collection, We'll talk a little more about it soon.

## Packages that make up Firebolt

* Client
* Core
* Validators
* Themes
