# Releasing

Releases are made from `main`. The repository does not require a permanent
development branch.

## Prepare the release

1. Start with a clean, up-to-date `main` branch.
2. Choose the appropriate semantic version increment:

   ```sh
   npm run bump:patch
   npm run bump:minor
   npm run bump:major
   ```

   The command updates `package.json` and `package-lock.json` without creating
   a commit or tag.

3. Move the relevant entries in `CHANGELOG.md` from `Unreleased` to a heading
   containing the new version and release date. Keep a new `Unreleased`
   heading above it.
4. Run the complete local verification:

   ```sh
   npm run check
   npm pack --dry-run
   ```

5. Review the changes and package contents before committing.

## Publish the release

After the release changes have been reviewed and committed:

1. Create an annotated tag matching the package version, for example
   `v0.2.0`.
2. Push `main`.
3. Push the release tag.

Consumers installing from GitHub can pin the tag:

```json
{
  "@gbv/bartoc-components": "github:gbv/bartoc-components#v0.2.0"
}
```
