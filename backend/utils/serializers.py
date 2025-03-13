def serialize_user(user: dict) -> dict:
    user['_id'] = str(user['_id'])
    return user
