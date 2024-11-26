# Blue Archive These are my students

Website to share Blue Archive's students with other people. No need to capture screen anymore.

# Add new student

1. Add `webp` image of the student (should be in `200x226 pixel`) to `/public/students` directory with the file's name be their `id`.
2. Add student's data to `/src/data/student.data.js/studentData` object. The data should be added sorted by their id. The data structure of the student is described below.
3. Add student's id to `/src/data/student.data.js/studentDefaultOrderSortData` array sorted by their release date. The older one come first.
4. Run `yarn sort-order` to get students' id sorted by their name in English and Thai. You can do it manually if you know what you're doing.
5. Replace the array of `/src/data/student.data.js/studentEnSortData` and `/src/data/student.data.js/studentThSortData` with the array from step 4.

# Student's data

The student's data is kept inside object. Each item in the object has the same structure as follows

```js
{
    10000: {
        defaultOrder: 0,
        nameEn: "Aru",
        school: "Gehenna",
        defaultStar: 3,
        squadType: "Main",
        tacticRole: "DamageDealer",
        bulletType: "Explosion",
        armorType: "LightArmor",
        availability: "Permanent",
        nameTh: "อารุ",
  }
}
```

The detail of each value are listed in the table below
| Name | Detail |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Object's key | Student's id. Used to determine order of the student. Aka student unique id. |
| defaultOrder | The number indicates release order of the student. |
| nameEn | The student's name in English |
| school | The student's school |
| defaultStar | The default star. The value can be 1, 2 or 3. |
| squadType | The student's type. <br>"Main" = "Striker", <br>"Support" = "Special" |
| tacticRole | The student's role. <br>"Tanker" = "Tank", <br>"DamageDealer" = "Dealer", <br>"Healer" = "Healer", <br>"Supporter" = "Support", <br>"Vehicle" = "T.S." |
| bulletType | The student's attack type. <br>"Explosion" = "Explosive", <br>"Pierce" = "Piercing", <br>"Mystic" = "Mystic", <br>"Sonic" = "Sonic" |
| armorType | The student's defense type. <br>"LightArmor" = "Light", <br>"HeavyArmor" = "Heavy", <br>"Unarmed" = "Special", <br>"ElasticArmor" = "Elastic" |
| availability | The recruit type of the student. <br>"Permanent" = Always available in the pool, <br>"Unique" = Only available in its pool, <br>"Event" = Can only obtain by the event, <br>"Fest" = Only available in the festival pool |
| nameTh | The student's name in Thai |

# Add new ticket

Add, remove or update ticket can be done inside `/src/data/ticket.data.js/ticketData` object. The key of the object refers to the string that will be shown in the button. The value of the object must be `Set` which contain string of student's id.

You can easily get list of student's id by enable debug code in `/src/app.jsx` (search with the keyword `DEBUG`). By enabling it, the console will print list of student's id marked as owned.

# Add new shop

Similar to [ticket section](#add-new-ticket).
