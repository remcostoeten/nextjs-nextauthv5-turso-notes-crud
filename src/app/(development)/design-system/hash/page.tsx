'use client'

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
} from '@/components/ui'
import CodeHighlight from '@/components/ui/CodeHighlight/CodeHighlight'
import generateUUID from '@/core/utils/generate-uuid'
import hashPassword from '@/core/utils/hash-password'
import React, { useState } from 'react'

export default function HashAndUUIDShowcase() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [submittedData, setSubmittedData] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newUUID = generateUUID()
        const newHashedPassword = await hashPassword(password)

        const resultData = JSON.stringify(
            {
                name,
                uuid: newUUID,
                hashedPassword: newHashedPassword,
            },
            null,
            2,
        )

        setSubmittedData(resultData)
    }

    const introBlock = `
// UUID Generation
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// Password Hashing
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Usage in this component:
// 1. When the form is submitted, we generate a new UUID
// 2. We also hash the provided password
// 3. These values are then included in the submitted data output
`

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold mb-6">
                UUID and Password Hashing Showcase
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>
                        How UUID and Password Hashing are Used
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CodeHighlight language="typescript">
                        {introBlock}
                    </CodeHighlight>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Generate UUID and Hash Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1"
                            >
                                Name:
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-1"
                            >
                                Password:
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {submittedData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Submitted Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CodeHighlight language="json">
                            {submittedData}
                        </CodeHighlight>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
