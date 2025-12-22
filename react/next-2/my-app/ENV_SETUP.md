# MongoDB Setup Instructions

## Environment Variables

Create a `.env.local` file in the root of the `my-app` directory with the following:

```env
MONGODB_URI=mongodb://localhost:27017
```

### For Local MongoDB:
If you're running MongoDB locally, use:
```env
MONGODB_URI=mongodb://localhost:27017
```

### For MongoDB Atlas (Cloud):
If you're using MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
```

Replace `username`, `password`, and `cluster.mongodb.net` with your actual MongoDB Atlas credentials.

## Database and Collection

The app will automatically create:
- **Database**: `todoapp`
- **Collection**: `todos`

No manual setup required - the app will create these on first use.

## Testing the Connection

1. Make sure MongoDB is running (if using local MongoDB)
2. Start the Next.js dev server: `npm run dev`
3. Navigate to `/todo` page
4. Try adding a todo - if it works, your connection is successful!

