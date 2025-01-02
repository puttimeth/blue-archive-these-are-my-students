# Blue Archive These are my students

Website to share Blue Archive's students with other people. No need to capture screen anymore.

# Features

1. Sort by name (English or Thai) or release date.
2. Marked students as 'owned' or 'favorite'.
3. Share link also contain 'owned' and 'favorite' status.
4. Filter by
   - Student's star
   - Student's availability
   - Ticket
   - Shop
   - Student's squad type

# For Developer

## Add new student

1. Add `webp` image of the student (prefers `200x226 pixel`) to `/public/students` directory with the file's name be their `id`.
2. Add student's data to [`student.data.js/studentData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/student.data.js) object. The data should be added sorted by their id. The data structure of the student is described below.
3. Add student's id to [`student.data.js/studentDefaultOrderSortData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/student.data.js) array sorted by their release date. The older one come first.
4. Run `yarn sort-order` to get students' id sorted by their name in English and Thai. You can do it manually if you know what you're doing.
5. Replace the array of [`student.data.js/studentEnSortData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/student.data.js) and [`student.data.js/studentThSortData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/student.data.js) with the array from step 4.

## Student's data

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
| isJpOnly | (Optional) A boolean flag indicates whether this student appears only on the JP server |

## Add new ticket

Add, remove or update ticket can be done inside [`ticket.data.js/ticketData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/ticket.data.js) object. The key of the object refers to the string that will be shown in the button. The value of the object must be `Set` which contain string of student's id.

You can easily get list of student's id by enable debug code in `/src/app.jsx` (search with the keyword `DEBUG`). By enabling it, the console will print list of student's id marked as owned.

## Add new shop

Similar to [ticket section](#add-new-ticket) but apply the changes to [`shop.data.js/shopData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/shop.data.js) instead.

## Share Data

In short, sharing data is done through passing URL params. The URL params is encoding owned and favor status with base64.

To go further, I have to specify a data structure used in the project.
`DeckState` is an object. The key is student's id. The value is an object which contains two keys, `owned` and `fav`, the value will be boolean. The overall structure look like this.

```js
{
  10000: { owned: false, fav: false },
  10001: { owned: false, fav: false },
  ...
}
```

The below is the steps for encoding and decoding.

Example data

```js
{
  10000: { owned: false, fav: false },
  10001: { owned: true, fav: false },
  10002: { owned: false, fav: true },
  10003: { owned: true, fav: false },
  10004: { owned: true, fav: false },
}
```

### Encoding (`DeckState` to base64 string)

Step 1: Convert to binary string. The order is determined by the order in [`student.data.js/studentDefaultOrderSortData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/student.data.js)

```js
{
  owned: "01011",
  fav: "00100",
}
```

Step 2: Padding '0'. A character of base64 string is 6 characters of binary string.

```js
{
  owned: "010110",
  fav: "001000",
}
```

Step 3: Convert to base64 string

```js
{
  owned: "W",
  fav: "I",
}
```

Step 4: Concatenate owned string and 'fav' string. If there is no 'fav', 'fav' string won't be used to reduce length of the URL params.

```
WI
```

### Decoding (base64 string to `DeckState`)

Step 1: Check the base64 string. This string may contain the 'fav' string. To determine this, check if the size of the base64 string is less than or equal to (number of students / 6). If it is, the base64 string doesn't contain the 'fav' string.

Note: The comparison should use 'less than or equal to' because the number of students can increase over time. However, this logic may break if the number of students doubles from the moment the user clicks the share button, which would require a significant amount of time to occur.

```
WI
```

Step 2: Split base64 string into half and convert back to binary string. If it is determined that the string didn't contain 'fav' string, the whole string will be used instead.

```js
{
  owned: "010110",
  fav: "001000",
}
```

Step 3: Assign 'owned' and 'favor' status to `DeckState` according to the order in [`student.data.js/studentDefaultOrderSortData`](https://github.com/puttimeth/blue-archive-these-are-my-students/blob/309ae86507b24453e7659c25ea7589e65b3e58ef/src/data/student.data.js)
