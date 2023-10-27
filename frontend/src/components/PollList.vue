<template>
<div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid pl-0 pr-0">
     <a class="navbar-brand" href="#">Live Polling App</a>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarNav">
       <ul class="navbar-nav">

         <li class="nav-item">
           <router-link class="nav-link" to="/">Home</router-link>
         </li>
         <!-- <li class="nav-item">
           <router-link class="nav-link" to="/login">Login</router-link>
         </li>
         <li class="nav-item">
           <router-link class="nav-link" to="/signup">Signup</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/posts">Posts</router-link>
          </li>
         <li class="nav-item">
           <router-link class="nav-link" to="/posts">Completed</router-link>
         </li>
         <li class="nav-item">
           <router-link class="nav-link" to="/posts">My Polls</router-link>
         </li>
       </ul>
     </div>
     <div class="logout-btn-container">
       <button class="Btn" @click.prevent="onLogout">
         <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c-17.7 0-32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
         <a href="#" class="text" @click.prevent="onLogout">Logout</a>
       </button>
     </div>
    </div>
    </nav>
    <!-- <h1 class="heading_h1">Your Polls</h1> -->
    <button class="btn btn-primary" @click="showForm">
      Create Poll
    </button>
    <!-- <poll-form @save-poll="savePoll"></poll-form> -->
    <!-- <poll-form @save-poll="savePoll" :showForm="isCreatePollFormVisible"></poll-form> -->
    <div v-if="formVisible" class="modal">
      <poll-form @save-poll="savePoll" @close-form="closeForm" />
    </div>
    <h1 class="heading_h1">Your Polls</h1>
  <!-- other card -->
  <div style="padding-left:3%; padding-right: 2%">
    <div class="row">
      <div class="col-md-4" v-for="poll in polls" :key="poll._id">
        <div class="card mb-3">
          <div class="card-header" style="background-color:#2196f3; color:white">
            <h5 class="card-title" style="margin-bottom:0px; padding:5%;">Q. {{ poll.question }}</h5>
          </div>
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Poll Valid Till : {{ poll.dueDate }}</h6>
              <div class="mb-3">
                <div></div>
                  <ul style="padding-left:0px">
                      <p class="poll-options" v-for="option in poll.options" :key="option">{{ option }}</p>
                  </ul>
              </div>
              <p class="card-text">Visibility: {{ poll.visibility }}</p>
              <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import axios from "axios";
import PollForm from "@/components/PollForm.vue";

Vue.use(axios);

export default {
  // name: "PollCrud",
  // components: {
  //   PollForm,
  // },
  // data() {
  //   return {
  //     result: {},
  //     poll: {
  //       _id: "",
  //       question: "",
  //       options: ["", ""],
  //       dueDate: "",
  //       visibility: "public"
  //     },
  //     isCreatePollFormVisible: false,
  //   };
  // },
  // created() {
  //   this.PollLoad();
  // },
  // mounted() {
  //   console.log("mounted() called.......");
  // },

  // methods: {
  //   PollLoad() {
  //     var page = "http://localhost:8000/poll/getAll";
  //     axios.get(page).then(({ data }) => {
  //       console.log(data);
  //       this.result = data.data;
  //     });
  //   },

  //   openCreatePollForm() {
  //     this.isCreatePollFormVisible = true;
  //   },
  //   savePoll(pollData) {
  //     // Handle the form data when it's saved
  //     this.poll = pollData;
  //     this.saveData();
  //   },
  //   saveData() {
  //       // delete this.poll._id;
  //     axios
  //       .post("http://localhost:8000/poll/create", this.poll)
  //       .then(({ data }) => {
  //         alert("saveddddd");
  //         this.PollLoad();
  //         this.isCreatePollFormVisible = false;
  //       });
  //   },
  //   addOption() {
  //     this.poll.options.push("");
  //   },
  // },
  components: {
    'poll-form': PollForm,
  },
  data() {
    return {
      formVisible: false,
      polls: [],
    };
  },
  created() {
    // Fetch the data from the backend when the component is created
    this.fetchPolls();
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },
    closeForm() {
      this.formVisible = false;
    },
    async savePoll(poll) {
    try {
      const response = await axios.post('http://localhost:8000/poll/create', poll);

      if (response.data.status) {
        setTimeout(() => {
        console.log("Poll saved successfully");
        }, 0);
        this.polls.push(poll);
        this.closeForm();
        this.fetchPolls();
        } else {
          setTimeout(() => {
        console.error("Error: Backend returned an error");
        // You may display an error message to the user
      }, 0);
        }
      } catch (error) {
        setTimeout(() => {
      console.error("Error: HTTP request to the backend failed");
      // You may display an error message to the user
    }, 0);
      }
    },
    async fetchPolls() {
      try {
        const response = await axios.get('http://localhost:8000/poll/getAll');

        if (response.data.status) {
          console.log("Polls fetched successfully");
          this.polls = response.data.data;
        } else {
          console.error("Error: Backend returned an error while fetching polls");
        }
      } catch (error) {
        console.error("Error: HTTP request to fetch polls from the backend failed");
      }
    },
  },
};

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Gabarito&display=swap');

    .heading_h1{
      font-family: 'Lobster';
      color: black;
      font-size: 50px;
      padding-left: 10%;
    }

        .logout-btn-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 10px;
        }


        .navbar-brand{
        font-family: 'Lobster';
        color: black;
        /* font-size: 50px; */
        }

        .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(255, 65, 65);
    }

    .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .sign svg {
    width: 17px;
    }

    .sign svg path {
    fill: white;
    }

    .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
    }
    /* hover effect on button width */
    .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
    }

    .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
    }
    /* hover effect button's text */
    .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
    }
    /* button click effect*/
    .Btn:active {
    transform: translate(2px ,2px);
    }
    /* Poll options     */
    .poll-options {
      font-family: 'Gabarito';
      padding: 10px;
      border: 2px solid #32e875;
      cursor: pointer;
      font-size: 120%;
      transition: background-color 0.3s, box-shadow 0.3s;
      text-align: center;
    }

    .poll-options:hover {
      background-color: #32e875; /* Change the background color on hover */
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Add a shadow on hover */
      color: white;
    }

    .poll-options-selected {
      background-color: #007bff; /* Change the background color when selected */
      color: #fff; /* Change the text color when selected */
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Add a shadow when selected */
    }
    /*s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s
    s*/
    /* Add your CSS styles here for the modal */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
</style>
