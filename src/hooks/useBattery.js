import {useState, useEffect} from 'react';

const useBattery = () => {
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

  return battery;
};

export default useBattery;
