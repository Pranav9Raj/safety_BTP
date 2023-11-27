import Data from '../models/data.js';
import { isAuth } from '../controllers/auth.js';
  
const dataEntry = (req, res, next) => {

    // let decod = isAuth(req, res, next);

    // if (decod) {
      const deg = req.body.degree_of_injury;
      let degint;
      if (deg == "Fatal") degint = 1;
      else degint = 0;
  
      // const eml = decod.email;
  
      // if (eml) {
        Data.create({
          abstract_text: req.body.abstract_text.toLowerCase(),
          degree_of_injury: degint,
          part_of_body: req.body.part_of_body.toLowerCase(),
          event_type: req.body.event_type.toLowerCase(),
          env_factor: req.body.env_factor.toLowerCase(),
          human_factor: req.body.human_factor.toLowerCase(),
          user_email: 'abc@gmail.com'
        })
          .then(() => {
            res.status(200).json({ message: "entry successful!!" });
          })
          .catch(err => {
            console.log(err);
            res.status(502).json({ message: "error while entering the data" });
          });
      // } else {
      //   res.status(400).json({ message: "User email is missing or invalid" });
      // }
  //   } else {
  //     res.status(400).json({ message: "Authentication failed" });
  //   }
  };

export { dataEntry };
