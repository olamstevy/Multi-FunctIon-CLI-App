# MULTI-FUNCTON CLI APP

This repository contains a javascript file *app.js* with various CLI projects. Below is a list of the projects along with instructions on how to use them.

## Project Features

1. **Select Text Content**: Prints text content of an element that matches a given selector in a given URL.
2. **Most Starred Project**: Prints the most starred project on GitHub between two dates.
3. **Bulk Rename Files**: Bulk renames files in a directory.
4. **Bulk Compress Images**: Compresses all images in a directory.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/olamstevy/cli-projects.git
    cd cli-projects
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

### 1. Select Text Content

```sh
node app.js selectTextContent
```
This will prompt you to enter a URL and a CSS selector. It will print the text content of the element matching the selector from the given URL.

### 2. Most Starred Project

```sh
node app.js mostStarredProject
```
This will prompt you to enter a start date and an end date. It will then print details of the most starred project on GitHub created between these dates.

### 3. Bulk Rename Files

```sh
node app.js bulkRenameFiles
```
This script will rename all files in a directory based on a pattern. You should specify a directory in the code. **`./images`** is default

### 4. Bulk Compress Images

```sh
node app.js bulkCompressImages
```
This script compresses all images in the specified directory by resizing them. If an output path is provided, the compressed images will be saved there; otherwise, they will be saved in the same directory with a prefix.

## Acknowledgement

* **Node.js** - Programming Language
* **Sharp** - Image compression
* **Octokit** - API Request to GitHub
* **Cheerio** - Serverside DOM
