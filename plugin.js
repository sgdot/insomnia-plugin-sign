module.exports.templateTags = [{
    name: 'signature',
    displayName: 'Signature',
    description: 'Signature',
    args: [
        {
            displayName: 'Secret Key',
            type: 'string',
            defaultValue: ''
        },
        {
            displayName: 'Position',
            type: 'enum',
            defaultValue: 'after',
            options: [
                {
                    displayName: 'Before',
                    value: 'before',
                },
                {
                    displayName: 'After',
                    value: 'after',
                }
            ],
        },
        {
            displayName: 'Hash function',
            type: 'enum',
            defaultValue: 'md5',
            options: [
                {
                    displayName: 'md5',
                    value: 'md5',
                }
            ],
        }
    ],
    async run(context, secret_key, position, hash_function) {
        var text = (await context.util.models.request.getById(context.meta.requestId)).body.text;
        if (!text) {
            text = '';
        }
        var body = await context.util.render(text);
        const crypto = require('crypto');
        const hash = crypto.createHash(hash_function);

        var sign = '';
        if (position === 'after') {
            sign = hash.update(body + secret_key).digest('hex');
        } else if (position === 'before') {
            sign = hash.update(secret_key + body).digest('hex');
        }
        return sign
    }
}]
