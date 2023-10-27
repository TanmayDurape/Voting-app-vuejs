<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create a Poll</h5>
          <button type="button" class="close" @click="closeForm" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit="saveForm">
          <div class="modal-body">
            <div class="form-group">
              <label for="question">Poll Question:</label>
              <input type="text" id="question" class="form-control" v-model="question" required>
            </div>

            <div class="form-group" v-for="(option, index) in options" :key="index">
              <label :for="'option' + index">Option {{ index + 1 }}:</label>
              <input :id="'option' + index" type="text" class="form-control" v-model="options[index]" required>
            </div>

            <div class="form-group">
              <label for="dueDate">Due Date:</label>
              <input type="date" id="dueDate" class="form-control" v-model="dueDate" required>
            </div>

            <div class="form-group">
              <label for="visibility">Visibility:</label>
              <select id="visibility" class="form-control" v-model="visibility">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="addOption" :disabled="options.length >= 5">Add Option</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  data(){
    return {
      question: '',
      options: ['',''],
      dueDate: '',
      visibility: 'public',
    };
  },
  methods: {
    async saveForm() {
      try {
        const response = await axios.post('http://localhost:8000/poll/create', {
          question: this.question,
          options: this.options,
          dueDate: this.dueDate,
          visibility: this.visibility,
        });

        if (response.data.status) {
          this.closeForm();
          // You may display a success message to the user
        } else {
          // Handle the case where the backend returns an error
          // You may display an error message to the user
        }
      } catch (error) {
        // Handle the case where the HTTP request to the backend fails
        // You may display an error message to the user
      }
    },
    closeForm() {
      this.$emit('close-form');
    },
    addOption() {
      this.options.push('');
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here for the form */
</style>
