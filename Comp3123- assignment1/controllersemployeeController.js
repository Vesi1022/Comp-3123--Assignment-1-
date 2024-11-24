const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(400).send({ message: 'Error fetching employees', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send({ message: 'Employee created successfully', employee_id: employee._id });
    } catch (error) {
        res.status(400).send({ message: 'Error creating employee', error: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send({ message: 'Error fetching employee', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(200).send({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error updating employee', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).send({ message: 'Error deleting employee', error: error.message });
    }
};

