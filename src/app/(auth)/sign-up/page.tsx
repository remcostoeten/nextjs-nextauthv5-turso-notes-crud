'use client'

import React, { useState } from 'react'

const Page = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        // Proceed with form submission
        setError('')
        console.log('Form submitted')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Password:</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    Show Password
                </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
        </form>
    )
}

export default Page
