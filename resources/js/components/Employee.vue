<template>
    <div class="container">
        <h3 class="mt-5">Employee Management</h3>
        <div class="content-wrapper">
            <div class="form-area">
                <form @submit.prevent="save" id="check-register-form">
                    <div class="row">
                        <div class="col-md-6">
                            <v-text-field
                                v-model="employee.name"
                                label="Employee Name"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-md-6">
                            <v-text-field
                                v-model="employee.address"
                                label="Employee Address"
                                required
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <v-text-field
                                v-model="employee.phone"
                                label="Phone"
                                required
                            ></v-text-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <v-btn type="submit" color="success" form="check-register-form">Save</v-btn>
                        </div>
                    </div>
                </form>
            </div>

            <v-table theme="light" class="mt-4 table-area">
                <thead>
                <tr>
                    <th class="text-left">Employee ID</th>
                    <th class="text-left">Employee Name</th>
                    <th class="text-left">Address</th>
                    <th class="text-left">Phone</th>
                    <th class="text-left">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="employee in result" :key="employee.id">
                    <td>{{ employee.id }}</td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.address }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>
                        <v-btn type="button" color="secondary" @click="edit(employee)">Edit</v-btn>
                        <v-btn type="button" color="danger" @click="remove(employee)" class="ml-2">Delete</v-btn>
                    </td>
                </tr>
                </tbody>
            </v-table>

        </div>
        <div class="footer">
            <p>Made by Vasyl Hryn</p>
        </div>
    </div>

</template>

<script>
import axios from 'redaxios';

export default {
    name: 'Employee',
    data() {
        return {
            result: [],
            employee: {
                id: '',
                name: '',
                address: '',
                phone: ''
            }
        };
    },
    created() {
        this.EmployeeLoad();
    },
    methods: {
        EmployeeLoad() {
            axios.get("http://127.0.0.1:8000/api/employee")
                .then(({data}) => {
                    this.result = data;
                });
        },
        save() {
            if (this.employee.id === '') {
                this.saveData();
            } else {
                this.updateData();
            }
        },
        saveData() {
            axios.post("http://127.0.0.1:8000/api/employee", this.employee)
                .then(() => {
                    this.EmployeeLoad();
                    this.employee.name = '';
                    this.employee.address = '';
                    this.employee.phone = '';
                    this.employee.id = '';
                });
        },
        edit(employee) {
            this.employee = employee;
        },
        updateData() {
            axios.put(`http://127.0.0.1:8000/api/employee/${this.employee.id}`, this.employee)
                .then(() => {
                    this.employee.name = '';
                    this.employee.address = '';
                    this.employee.phone = '';
                    this.employee.id = '';
                    this.EmployeeLoad();
                });
        },
        remove(employee) {
            axios.delete(`http://127.0.0.1:8000/api/employee/${employee.id}`)
                .then(() => {
                    this.EmployeeLoad();
                });
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    background-color: #e0f7fa;
}

.content-wrapper {
    width: 100%;
    max-width: 800px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: bold;
    color: #00796b;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(to right, #00796b, #26a69a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}


.v-text-field input {
    background-color: #e0f7fa;
}

.table-area {
    margin-top: 20px;
}

.footer {
    text-align: center;
    margin-top: 20px;
    font-size: 0.8rem;
    color: #000000;
}

.ml-2 {
    margin-left: 10px;
}

.footer p {
    margin: 0;
    opacity: 0.7;
}
</style>
