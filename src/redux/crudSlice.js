const { createSlice } = require('@reduxjs/toolkit');
// Sample student data
const sampleStudents = [
    { id: 1, name: 'Rual Octo', address: 'Deban Street', city: 'New York', country: 'USA' },
    { id: 2, name: 'Demark', address: 'City Road.13', city: 'Dubai', country: 'UAE' },
    { id: 3, name: 'Suresh', address: 'main Street', city: 'chennai', country: 'INDIA' },
    { id: 4, name: 'Vijay', address: 'sub road', city: 'kenya', country: 'EUROPE' },
    { id: 5, name: 'Lohith', address: '2nd cross', city: 'New city', country: 'MARACO' },
    { id: 6, name: 'Lokesh', address: 'City Road.16', city: 'mayanamar', country: 'BRAZIL' },
];
const crudSlice = createSlice({

    name: 'crud',
    initialState: sampleStudents,
    reducers: {
        Create(state, action) {
            state.push(action.payload)
        },
        Update(state, action) {
            const { id } = action.payload;

            // Find the index of the item to update based on its id
            const indexToUpdate = state.findIndex(student => student.id === id);

            if (indexToUpdate !== -1) {
                // Update the item with the new data
                state[indexToUpdate] = { ...state[indexToUpdate], ...action.payload };
            }

        },
        Delete(state, action) {
            // action.payload should contain the index to be deleted
            const indexToDelete = action.payload;
            // Check if the index is valid and within the array bounds
            if (indexToDelete >= 0 && indexToDelete <=state.length) {
                // Use splice to remove the item at the specified index
                state.splice(indexToDelete - 1, 1);
                // After deleting, update the IDs to ensure they are sequential
                for (let i = indexToDelete - 1; i < state.length; i++) {
                    state[i].id = i + 1;
                }
            }
        },
        Search(state, action) {
            const searchString = action.payload.toLowerCase();

            // Filter the students based on the search term
            state = sampleStudents.filter(student => {
                if (searchString === '') {
                    return true; // Show all students when search is empty
                }
                return (
                    student.id.toString().toLowerCase().includes(searchString) ||
                    student.name.toLowerCase().includes(searchString) ||
                    student.address.toLowerCase().includes(searchString) ||
                    student.city.toLowerCase().includes(searchString) ||
                    student.country.toLowerCase().includes(searchString)
                );
            });
            return state;
        },
    },
});

export const { Create, Update, Delete, Search } = crudSlice.actions;
export default crudSlice.reducer;
