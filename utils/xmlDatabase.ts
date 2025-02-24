import { XMLBuilder, XMLParser } from 'fast-xml-parser';

interface User {
  uniqueName: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'transgender';
}

let xmlData = `
<users>
</users>
`;

export async function addUserToXML(user: User): Promise<void> {
  const parser = new XMLParser();
  const jsonObj = parser.parse(xmlData);

  if (!jsonObj.users) {
    jsonObj.users = { user: [] };
  } else if (!Array.isArray(jsonObj.users.user)) {
    jsonObj.users.user = [jsonObj.users.user].filter(Boolean);
  }

  jsonObj.users.user.push(user);

  const builder = new XMLBuilder();
  xmlData = builder.build(jsonObj);

  console.log('Updated XML Data:', xmlData);
}

