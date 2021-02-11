import React, {useState, useEffect} from 'react';

const Battery = () => {
  const [battery, setBattery] = useState({
    level: 0,
    charging: false
  });

  const onChange = ({ target: { level, charging } }) => {
    setBattery({ level, charging });
  };

  useEffect(() => {
    let battery;
    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener('levelchange', onChange);
      battery.addEventListener('chargingchange', onChange);
      onChange({ target: battery });
    })

    return () => {
      battery.removeEventListener('levelchange', onChange);
      battery.removeEventListener('chargingchange', onChange);
    }
  }, []);
  console.log('battery', battery);
  return (
      <div>
        Battery
      </div>
  );
};

export default Battery;
