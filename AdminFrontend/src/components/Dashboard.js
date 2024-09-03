import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are included

const Dashboard = () => {
  // Dummy data for pie charts
  const data1 = [
    { name: 'Total Users', value: 300 },
    { name: 'Active Users', value: 50 },
    { name: 'Inactive Users', value: 100 },
  ];

  const data2 = [
    { name: 'Green', value: 200 },
    { name: 'Purple', value: 100 },
    { name: 'Orange', value: 150 },
  ];

  const data3 = [
    { name: 'Pink', value: 120 },
    { name: 'Cyan', value: 250 },
    { name: 'Magenta', value: 200 },
  ];

  const data4 = [
    { name: 'Light Blue', value: 180 },
    { name: 'Light Green', value: 220 },
    { name: 'Light Red', value: 300 },
  ];

  const data5 = [
    { name: 'Total Orders', value: 350 },
    { name: 'Completed Orders', value: 150 },
    { name: 'Pending Orders', value: 220 },
    { name: 'Cancelled Orders', value: 80 },
  ];

  const COLORS1 = ['#ff6384', '#36a2eb', '#ffce56'];
  const COLORS2 = ['#4bc0c0', '#9966ff', '#ff9f40'];
  const COLORS3 = ['#ff69b4', '#00ffff', '#ff00ff'];
  const COLORS4 = ['#add8e6', '#90ee90', '#ff6347'];
  const COLORS5 = ['#00008b', '#006400', '#8b0000','#ff6384'];

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <div className="row mb-4">
        <div className="col-md-4 mb-4">
          <div className="card" style={{ border: 'none' }}>
            <div className="card-body" style={{ padding: '0' }}>
              <PieChart width={400} height={300} style={{ border: 'none' }}>
                <Pie data={data1} dataKey="value" nameKey="name" outerRadius={80}>
                  {data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS1[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <h5 className="card-title mt-2">Pie Chart 1</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card" style={{ border: 'none' }}>
            <div className="card-body" style={{ padding: '0' }}>
              <PieChart width={400} height={300} style={{ border: 'none' }}>
                <Pie data={data2} dataKey="value" nameKey="name" outerRadius={80}>
                  {data2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS2[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <h5 className="card-title mt-2">Pie Chart 2</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card" style={{ border: 'none' }}>
            <div className="card-body" style={{ padding: '0' }}>
              <PieChart width={400} height={300} style={{ border: 'none' }}>
                <Pie data={data3} dataKey="value" nameKey="name" outerRadius={80}>
                  {data3.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS3[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <h5 className="card-title mt-2">Pie Chart 3</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ border: 'none' }}>
            <div className="card-body" style={{ padding: '0' }}>
              <PieChart width={400} height={300} style={{ border: 'none' }}>
                <Pie data={data4} dataKey="value" nameKey="name" outerRadius={80}>
                  {data4.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS4[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <h5 className="card-title mt-2">Pie Chart 4</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ border: 'none' }}>
            <div className="card-body" style={{ padding: '0' }}>
              <PieChart width={400} height={300} style={{ border: 'none' }}>
                <Pie data={data5} dataKey="value" nameKey="name" outerRadius={80}>
                  {data5.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS5[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              <h5 className="card-title mt-2">Pie Chart 5</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;