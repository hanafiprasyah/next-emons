const deviceList = [
  {
    id: 1,
    name: "EMONS A",
    slogan: "emonsA",
    location: "MDP Lantai 1",
    q_score: "100",
    sensors: [
      {
        sensor_id: 1,
        sensor_name: "Power Meter",
        score: "100",
      },
      {
        sensor_id: 2,
        sensor_name: "PZEM",
        score: "100",
      },
      {
        sensor_id: 3,
        sensor_name: "PT100",
        score: "100",
      },
    ],
  },
  {
    id: 2,
    name: "EMONS B",
    slogan: "emonsB",
    location: "Ruang Operasi",
    q_score: "97",
    sensors: [
      {
        sensor_id: 1,
        sensor_name: "Power Meter",
        score: "100",
      },
      {
        sensor_id: 2,
        sensor_name: "PZEM",
        score: "92",
      },
      {
        sensor_id: 3,
        sensor_name: "PT100",
        score: "100",
      },
    ],
  },
  {
    id: 3,
    name: "EMONS C",
    slogan: "emonsC",
    location: "Ruang ICU",
    q_score: "74",
    sensors: [
      {
        sensor_id: 1,
        sensor_name: "Power Meter",
        score: "50",
      },
      {
        sensor_id: 2,
        sensor_name: "PZEM",
        score: "75",
      },
      {
        sensor_id: 3,
        sensor_name: "PT100",
        score: "99",
      },
    ],
  },
  {
    id: 4,
    name: "EMONS D",
    slogan: "emonsD",
    location: "Ruang Radiologi",
    q_score: "0",
    sensors: [
      {
        sensor_id: 1,
        sensor_name: "Power Meter",
        score: "0",
      },
      {
        sensor_id: 2,
        sensor_name: "PZEM",
        score: "0",
      },
      {
        sensor_id: 3,
        sensor_name: "PT100",
        score: "0",
      },
    ],
  },
];

export default deviceList;
