### Test Payloads for Each API

#### Authentication APIs

1. **Register User**
   - **Endpoint**: `/register`
   - **Method**: `POST`
   - **Payload**:
     ```json
     {
       "username": "testuser",
       "password": "testpassword"
     }
     ```

2. **Login User**
   - **Endpoint**: `/login`
   - **Method**: `POST`
   - **Payload**:
     ```json
     {
       "username": "testuser",
       "password": "testpassword"
     }
     ```

---

#### Metadata APIs

3. **Fetch Authenticated User's Metadata**
   - **Endpoint**: `/metadata`
   - **Method**: `GET`
   - **Headers**: 
     ```
     Authorization: Bearer <access_token>
     ```

4. **Fetch Public Metadata**
   - **Endpoint**: `/public/metadata`
   - **Method**: `GET`
   - **Query Parameter**:
     ```
     username=testuser
     ```

5. **Create Metadata**
   - **Endpoint**: `/metadata`
   - **Method**: `POST`
   - **Headers**: 
     ```
     Authorization: Bearer <access_token>
     ```
   - **Payload**:
     ```json
     {
       "title": "My Blog",
       "description": "A blog about coding",
       "siteUrl": "https://example.com",
       "author": {
         "name": "Test User",
         "username": "testuser",
         "tagline": "Coder & Blogger",
         "bio": "Writing code and blogs",
         "avatar": "https://example.com/avatar.png",
         "achievements": [
           {"title": "Top Blogger", "description": "Awarded top blogger of 2024", "link": "https://example.com/award"}
         ],
         "experience": [
           {"title": "Software Engineer", "company": "TechCorp", "period": "2020-2024", "highlights": ["Built scalable systems"]}
         ],
         "education": [
           {"degree": "B.Tech", "school": "Tech University", "year": "2020", "honors": "First Class"}
         ],
         "social": {
           "twitter": "@testuser",
           "github": "https://github.com/testuser",
           "linkedin": "https://linkedin.com/in/testuser",
           "email": "testuser@example.com"
         }
       },
       "categories": [
         {"icon": "📝", "title": "Coding", "description": "All about code", "color": "#ff0000", "tag": "coding", "coverImage": "https://example.com/coding.jpg"}
       ],
       "tags": [
         {"name": "Python", "slug": "python", "description": "All about Python"}
       ],
       "seriesList": [
         {"title": "FastAPI Basics", "description": "Learn FastAPI", "icon": "🚀", "color": "#00ff00", "rating": 4.8, "articleCount": 5, "readCount": "1000"}
       ]
     }
     ```

6. **Update Site Info**
   - **Endpoint**: `/metadata/siteinfo`
   - **Method**: `PATCH`
   - **Headers**: 
     ```
     Authorization: Bearer <access_token>
     ```
   - **Payload**:
     ```json
     {
       "title": "Updated Blog Title",
       "description": "Updated blog description"
     }
     ```

7. **Update Author**
   - **Endpoint**: `/metadata/author`
   - **Method**: `PATCH`
   - **Headers**: 
     ```
     Authorization: Bearer <access_token>
     ```
   - **Payload**:
     ```json
     {
       "name": "Updated User",
       "username": "testuser",
       "tagline": "Updated Tagline",
       "bio": "Updated Bio",
       "avatar": "https://example.com/new-avatar.png",
       "achievements": [],
       "experience": [],
       "education": [],
       "social": {}
     }
     ```

8. **Update Categories**
   - **Endpoint**: `/metadata/categories`
   - **Method**: `PATCH`
   - **Headers**: 
     ```
     Authorization: Bearer <access_token>
     ```
   - **Payload**:
     ```json
     {
       "categories": [
         {"icon": "📚", "title": "Education", "description": "Learning resources", "color": "#0000ff", "tag": "education", "coverImage": "https://example.com/education.jpg"}
       ]
     }
     ```

9. **Update Tags**
   - **Endpoint**: `/metadata/tags`
   - **Method**: `PATCH`
   - **Headers**: 
     ```
     Authorization: Bearer <access_token>
     ```
   - **Payload**:
     ```json
     {
       "tags": [
         {"name": "JavaScript", "slug": "javascript", "description": "All about JavaScript"}
       ]
     }
     ```

10. **Update Series**
    - **Endpoint**: `/metadata/series`
    - **Method**: `PATCH`
    - **Headers**: 
      ```
      Authorization: Bearer <access_token>
      ```
    - **Payload**:
      ```json
      {
        "series": [
          {"title": "React Essentials", "description": "Learn React", "icon": "📘", "color": "#ff9900", "rating": 4.9, "articleCount": 7, "readCount": "1500"}
        ]
      }
      ```

This setup ensures that payloads are properly structured and ready for testing all endpoints.