const datos = {
  "usuer": {},  
  "items":[
    {
      "shape": "HEA-120",
      "material": "ASTM A572 Gr 50",
      "defaultlengthBar": 6000,
      "availableBars": [
        {"name": "b001", "length": 4800, "quantity": 1 },
        {"name": "b002", "length": 3550, "quantity": 2 },
        {"name": "b003", "length": 1850, "quantity": 2 }
      ],
      "list": [
        {"name": "p001", "length": 1000, "quantity": 3 },
        {"name": "p002", "length": 2000, "quantity": 4 },
        {"name": "p003", "length": 3000, "quantity": 2 },
        {"name": "p004", "length": 4000, "quantity": 2 },
        {"name": "p005", "length": 4000, "quantity": 4 },
        {"name": "p006", "length": 1200, "quantity": 6 }
      ]
    },
    {
      "shape": "HEA-200",
      "material": "ASTM A572 Gr 50",
      "defaultlengthBar": 6000,
      "availableBars": [
        {"name": "b001", "length": 4800, "quantity": 1 },
        {"name": "b002", "length": 3550, "quantity": 2 }
      ],
      "list": [
        {"name": "p001", "length": 1500, "quantity": 1 },
        {"name": "p002", "length": 2500, "quantity": 5 },
        {"name": "p003", "length": 3500, "quantity": 1 },
        {"name": "p004", "length": 4500, "quantity": 1 }
      ]
    },    
    {
      "shape": "HEA-300",
      "material": "ASTM A36",
      "defaultlengthBar": 6000,
      "availableBars": [],
      "list": [
        {"name": "p001", "length": 1500, "quantity": 12 },
        {"name": "p002", "length": 2500, "quantity": 1 },
        {"name": "p003", "length": 3500, "quantity": 4 },
        {"name": "p004", "length": 4500, "quantity": 15 },
        {"name": "p005", "length": 820, "quantity": 5 },
        {"name": "p006", "length": 3200, "quantity": 4 },
        {"name": "p007", "length": 1800, "quantity": 1 },
        {"name": "p008", "length": 750, "quantity": 11 }
      ]
    }
  ]
}

export const options = {   
  method: 'POST',
  body: JSON.stringify(datos),
  headers: {
    'Content-Type': 'application/json'
  }
}
