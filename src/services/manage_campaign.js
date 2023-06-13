import axios from 'axios';

const getallblogs = async () => {
    const { data } = await axios.get('http://localhost:5000/api/v1/banner');
    console.log(" data = ", data);
    return data;
};

module.exports = { getallblogs };
